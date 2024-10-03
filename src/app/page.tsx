import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { Container } from '@/components/Container';
import { Heading, Icon } from 'copilot-design-system';

import 'copilot-design-system/dist/styles/main.css';

/**
 * The revalidate property determine's the cache TTL for this page and
 * all fetches that occur within it. This value is in seconds.
 */
export const revalidate = 180;

function Content() {
  return (
    <Container>
      <header className="max-w-prose">
        <div className="w-8 mb-4">
          <Icon icon="AppSetup" />
        </div>
        <div className="mb-4">
          <Heading variant="3xl">Welcome to the custom app base</Heading>
        </div>
        <Heading variant="lg" tag="p">
          This is a demo of a custom app that integrates with Copilot. Our goal
          is to enable developers to easily make apps that look and feel like a
          part of our software, creating a seamless experience for your clients.
        </Heading>
      </header>

      <div className="grid grid-cols-2 gap-8 mt-12 max-w-prose">
        <div>
          <a
            href="https://docs.copilot.com/reference"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex">
              <Heading variant="2xl">Docs</Heading>
              <Icon icon="ArrowNE" className="w-4 ml-1" />
            </div>
          </a>
          <p className={`m-0 mt-1 text-sm opacity-50`}>
            Find detailed information about the Copilot API.
          </p>
        </div>

        <div>
          <a
            href="https://docs.copilot.com/docs"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex">
              <Heading variant="2xl">Learn</Heading>
              <Icon icon="ArrowNE" className="w-4 ml-1" />
            </div>
          </a>
          <p className={`m-0 mt-1 max-w-[30ch] text-sm opacity-50`}>
            Learn how to integrate a custom app into the Copilot platform.
          </p>
        </div>

        <div>
          <a
            href="https://www.copilot.com/experts"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex">
              <Heading variant="2xl">Explore</Heading>
              <Icon icon="ArrowNE" className="w-4 ml-1" />
            </div>
          </a>
          <p className={`m-0 mt-1 max-w-[30ch] text-sm opacity-50`}>
            See our experts directory, and join to receive work opportunities
            building on top of Copilot.
          </p>
        </div>

        <div>
          <a href="/bridge" className="group" rel="noopener noreferrer">
            <Heading variant="2xl">App Bridge</Heading>
          </a>
          <p className={`m-0 mt-1 max-w-[30ch] text-sm opacity-50`}>
            Learn how to integrate your app with Copilot with this live demo of
            the App Bridge.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content />
    </TokenGate>
  );
}
