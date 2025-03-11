import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { Container } from '@/components/Container';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

async function Content() {
  return (
    <Container>
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto">
          Internal Page&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://copilot.app"
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

      <div className="flex-col mb-32 text-center lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          This page is served to internal users.
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          This is an example of a page that is served to internal users only.
        </p>
      </div>
    </Container>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content />
    </TokenGate>
  );
}
