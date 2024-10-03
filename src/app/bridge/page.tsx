import { Heading, Icon } from 'copilot-design-system';
import { Container } from '@/components/Container';

import 'copilot-design-system/dist/styles/main.css';
import { Demo } from '@/app/bridge/demo';

export default function Page() {
  return (
    <Container>
      <div className="max-w-lg">
        <Icon icon="Integrations" className="w-8 mb-4" />
        <h1 className="mb-4">
          <Heading variant="2xl" tag="span">
            Copilot App Bridge Demo
          </Heading>
        </h1>

        <p className="mb-4">
          <Heading variant="lg" tag="p">
            Helper functions for integrating your custom app with your Copilot
            workspace. Our goal is to enable developers to easily make apps that
            look and feel like a part of our software, creating a seamless
            experience for your clients.
          </Heading>
        </p>

        <p className="mb-4">
          <Heading variant="lg" tag="p">
            Try it out below.
          </Heading>
        </p>
      </div>

      <Demo />
    </Container>
  );
}
