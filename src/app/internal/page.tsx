import { copilotApi } from 'copilot-node-sdk';
import Image from 'next/image';
import { need } from '@/utils/need';
import { TokenGate } from '@/components/TokenGate';

const API_KEY = need<string>(process.env.COPILOT_API_KEY);

/**
 * A helper function that instantiates the Copilot SDK and fetches data
 * from the Copilot API based on the contents of the token that gets
 * passed to your app in the searchParams.
 */
async function getContent(searchParams: SearchParams) {
  const copilot = copilotApi({
    apiKey: API_KEY,
    token:
      'token' in searchParams && typeof searchParams.token === 'string'
        ? searchParams.token
        : undefined,
  });
  const data: {
    workspace: Awaited<ReturnType<typeof copilot.retrieveWorkspace>>;
    client?: Awaited<ReturnType<typeof copilot.retrieveClient>>;
    company?: Awaited<ReturnType<typeof copilot.retrieveCompany>>;
    internalUser?: Awaited<ReturnType<typeof copilot.retrieveInternalUser>>;
  } = {
    workspace: await copilot.retrieveWorkspace(),
  };
  const tokenPayload = await copilot.getTokenPayload?.();

  if (tokenPayload?.clientId) {
    data.client = await copilot.retrieveClient({ id: tokenPayload.clientId });
  }
  if (tokenPayload?.companyId) {
    data.client = await copilot.retrieveCompany({
      id: tokenPayload.companyId,
    });
  }
  if (tokenPayload?.internalUserId) {
    data.client = await copilot.retrieveInternalUser({
      id: tokenPayload.internalUserId,
    });
  }

  return data;
}

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getContent(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log({data});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Internal Page&nbsp;
          {data.internalUser && (
            <code className="font-mono font-bold">
              — Logged in as {data.internalUser.givenName}{' '}
              {data.internalUser.familyName}
            </code>
          )}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://copilot.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/copilot_icon.png"
              alt="Copilot Icon"
              className="dark:invert"
              width={24}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="flex-col mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          This page is served to internal users.
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          This is an example of a page that is served to internal users only.
        </p>
      </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
