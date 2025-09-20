import {
  type CheckAssetPermissionParams,
  checkAssetPermission as checkDbAssetPermission,
  getUserOrganizationsByUserId,
} from '@buster/database/queries';
import type { User } from '@buster/database/queries';
import type { AssetType } from '@buster/database/schema-types';
import type { AssetPermissionRole, OrganizationMembership, WorkspaceSharing } from '../types';
import { getHighestPermission, isPermissionSufficientForAny } from '../types/asset-permissions';
import { getCachedPermission, setCachedPermission } from './cache';
import { checkCascadingPermissions } from './cascading-permissions';

export interface AssetPermissionCheck {
  userId: string;
  assetId: string;
  assetType: AssetType;
  requiredRole: AssetPermissionRole | AssetPermissionRole[];
  organizationId?: string;
  workspaceSharing?: WorkspaceSharing;
}

export interface AssetPermissionResult {
  hasAccess: boolean;
  effectiveRole?: AssetPermissionRole;
  accessPath?: 'direct' | 'workspace_sharing' | 'cascading' | 'admin';
}

/**
 * Check if a user has sufficient permission to perform an action on an asset
 */
export async function checkPermission(check: AssetPermissionCheck): Promise<AssetPermissionResult> {
  const { userId, assetId, assetType, requiredRole, organizationId, workspaceSharing } = check;

  // Normalize requiredRole to an array for consistent handling
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Check cache first (using serialized array as key)
  const cached = getCachedPermission(userId, assetId, assetType, requiredRoles);

  if (cached !== undefined) {
    return cached;
  }

  // Get user's organization memberships
  const userOrgs = await getUserOrganizationsByUserId(userId);
  const orgMemberships: OrganizationMembership[] = userOrgs.map((org) => ({
    id: org.organizationId,
    role: org.role,
  }));

  // Check database permissions (includes admin check)
  const dbParams: CheckAssetPermissionParams = {
    userId,
    assetId,
    assetType,
  };
  if (organizationId !== undefined) {
    dbParams.organizationId = organizationId;
  }
  const dbResult = await checkDbAssetPermission(dbParams);

  if (dbResult.hasAccess && dbResult.role) {
    // Check if the role is sufficient for any of the required roles
    if (isPermissionSufficientForAny(dbResult.role, requiredRoles)) {
      const result: AssetPermissionResult = {
        hasAccess: true,
        effectiveRole: dbResult.role,
      };
      if (dbResult.accessPath !== undefined) {
        result.accessPath = dbResult.accessPath;
      }
      setCachedPermission(userId, assetId, assetType, requiredRoles, result);
      return result;
    }
  }

  // Check workspace sharing if provided
  if (workspaceSharing && workspaceSharing !== 'none' && organizationId) {
    const isOrgMember = orgMemberships.some((org) => org.id === organizationId);

    if (isOrgMember) {
      const workspaceRole = mapWorkspaceSharingToRole(workspaceSharing);
      if (workspaceRole && isPermissionSufficientForAny(workspaceRole, requiredRoles)) {
        const result = {
          hasAccess: true,
          effectiveRole: workspaceRole,
          accessPath: 'workspace_sharing' as const,
        };
        setCachedPermission(userId, assetId, assetType, requiredRoles, result);
        return result;
      }
    }
  }

  // Check cascading permissions for specific asset types
  // Only check if any of the required roles is 'can_view' (cascading only provides view access)
  if (requiredRoles.includes('can_view')) {
    // Create a user object for cascading permissions check
    const user: Pick<User, 'id'> = { id: userId };
    const hasCascadingAccess = await checkCascadingPermissions(assetId, assetType, user as User);
    if (hasCascadingAccess) {
      const result = {
        hasAccess: true,
        effectiveRole: 'can_view' as AssetPermissionRole,
        accessPath: 'cascading' as const,
      };
      setCachedPermission(userId, assetId, assetType, requiredRoles, result);
      return result;
    }
  }

  const result = { hasAccess: false };
  setCachedPermission(userId, assetId, assetType, requiredRoles, result);
  return result;
}

/**
 * Compute the effective permission level for a user on an asset
 * Takes the highest permission from direct, workspace sharing, and admin roles
 */
export function computeEffectivePermission(
  directRole: AssetPermissionRole | null,
  workspaceSharing: WorkspaceSharing,
  organizationId: string,
  userOrgs: OrganizationMembership[]
): AssetPermissionRole | null {
  const roles: (AssetPermissionRole | null)[] = [];

  // Check admin roles
  const orgMembership = userOrgs.find((org) => org.id === organizationId);
  if (orgMembership) {
    if (orgMembership.role === 'workspace_admin' || orgMembership.role === 'data_admin') {
      return 'owner'; // Admins get owner access
    }
  }

  // Add direct role
  if (directRole) {
    roles.push(directRole);
  }

  // Add workspace sharing role
  if (workspaceSharing !== 'none' && orgMembership) {
    const workspaceRole = mapWorkspaceSharingToRole(workspaceSharing);
    if (workspaceRole) {
      roles.push(workspaceRole);
    }
  }

  return getHighestPermission(roles);
}

/**
 * Map workspace sharing level to permission role
 */
function mapWorkspaceSharingToRole(workspaceSharing: WorkspaceSharing): AssetPermissionRole | null {
  if (workspaceSharing === 'can_view') {
    return 'can_view';
  }
  if (workspaceSharing === 'can_edit') {
    return 'can_edit';
  }

  if (workspaceSharing === 'full_access') {
    return 'full_access';
  }

  if (workspaceSharing === 'none') {
    return null;
  }

  const _exhaustiveCheck: never = workspaceSharing;

  return null;
}

/**
 * Check if a user has any access to an asset (simplified check)
 */
export async function hasAnyAccess(
  userId: string,
  assetId: string,
  assetType: AssetType
): Promise<boolean> {
  const result = await checkPermission({
    userId,
    assetId,
    assetType,
    requiredRole: 'can_view', // Minimum permission level
  });

  return result.hasAccess;
}
