import type { User } from '@buster/database/queries';
import type { GetApprovedDomainsResponse } from '@buster/server-shared/security';
import { DomainService } from './domain-service';
import { fetchOrganization, validateUserOrganization } from './security-utils';

const domainService = new DomainService();

export async function getApprovedDomainsHandler(user: User): Promise<GetApprovedDomainsResponse> {
  // Validate user organization
  const userOrg = await validateUserOrganization(user.id);

  // Fetch organization
  const org = await fetchOrganization(userOrg.organizationId);

  // Return formatted domains response
  return domainService.formatDomainsResponse(org.domains, org.createdAt);
}
