import { TokenGate } from '@/components/TokenGate';
import { Container } from '@/components/Container';

import 'copilot-design-system/dist/styles/main.css';
import { copilotApi } from 'copilot-node-sdk';
import { Welcome } from '@/app/(home)/welcome';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const { token } = searchParams;
  const copilot = copilotApi({
    apiKey: process.env.COPILOT_API_KEY ?? '',
    token: typeof token === 'string' ? token : undefined,
  });
  const workspace = await copilot.retrieveWorkspace();
  const session = await copilot.getTokenPayload?.();
  console.log({ workspace, session });
  return (
    <Container>
      <Welcome />
    </Container>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
