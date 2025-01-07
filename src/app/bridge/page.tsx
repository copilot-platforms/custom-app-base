import { Body, Heading, Icon } from 'copilot-design-system';
import { Container } from '@/components/Container';
import { Demo } from '@/app/bridge/demo';
import { copilotApi } from 'copilot-node-sdk';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = searchParams;
  const copilot = copilotApi({
    apiKey: process.env.COPILOT_API_KEY ?? '',
    token: typeof token === 'string' ? token : undefined,
  });
  const workspace = await copilot.retrieveWorkspace();
  return (
    <Container className="max-w-screen-lg">
      <Demo portalUrl={workspace.portalUrl} />
    </Container>
  );
}
