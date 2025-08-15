import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/_app/logs/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/logs"!</div>;
}
