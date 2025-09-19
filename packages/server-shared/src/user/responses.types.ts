import { z } from 'zod';
import { OrganizationSchema } from '../organization/organization.types';
import { UserOrganizationRoleSchema } from '../organization/roles.types';
import { TeamSchema } from '../teams/teams.types';
import { PaginatedResponseSchema } from '../type-utilities/pagination';
import { UserFavoriteSchema } from './favorites.types';
import { OrganizationUserSchema } from './organization-user.types';
import { UserSchema } from './users.types';

const OrganizationWithUserRoleSchema = OrganizationSchema.extend({
  role: UserOrganizationRoleSchema,
});

export const UserResponseSchema = z.object({
  user: UserSchema,
  teams: z.array(TeamSchema),
  organizations: z.array(OrganizationWithUserRoleSchema).nullable(),
});

export const UserFavoriteResponseSchema = z.array(UserFavoriteSchema);

export const GetUserToOrganizationResponseSchema = PaginatedResponseSchema(OrganizationUserSchema);

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserFavoriteResponse = z.infer<typeof UserFavoriteResponseSchema>;
export type GetUserToOrganizationResponse = z.infer<typeof GetUserToOrganizationResponseSchema>;
export type UserOrganization = z.infer<typeof OrganizationWithUserRoleSchema>;
