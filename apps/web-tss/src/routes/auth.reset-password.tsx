import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
  validateSearch: z.object({
    email: z.string(),
  }),
});

function RouteComponent() {
  return <div>Hello "/auth/reset-password"!</div>;
}
