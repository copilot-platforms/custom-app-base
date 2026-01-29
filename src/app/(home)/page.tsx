import { Container } from '@/components/Container';
import { getSession } from '@/utils/session';
import { Header } from './sections/Header';
import { SessionContext } from './sections/SessionContext';
import { HeaderControls } from './sections/HeaderControls';
import { DesignShowcase } from './sections/DesignShowcase';
import { Resources } from './sections/Resources';
import { RequestTester } from './sections/RequestTester';
import { GettingStarted } from './sections/GettingStarted';

export const dynamic = 'force-dynamic';

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession(searchParams);
  const token =
    'token' in searchParams && typeof searchParams.token === 'string'
      ? searchParams.token
      : undefined;

  return (
    <Container className="max-w-screen-lg">
      <Header />
      <div className="space-y-12">
        <Resources />
        <SessionContext session={session} />
        <RequestTester token={token} />
        <HeaderControls />
        <DesignShowcase />
      </div>
    </Container>
  );
}

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const hasToken = 'token' in params && typeof params.token === 'string';

  if (!hasToken) {
    return <GettingStarted />;
  }

  return <Content searchParams={params} />;
}
