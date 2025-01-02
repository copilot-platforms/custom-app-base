'use client';

import { Body, Heading, Icon } from 'copilot-design-system';
import { Container } from '@/components/Container';
import { Demo } from '@/app/bridge/demo';

import 'copilot-design-system/dist/styles/main.css';

export default function Page() {
  return (
    <Container className="max-w-screen-lg">
      <div className="max-w-prose">
        <Icon icon="Code" className="w-8 mb-4" />

        <Heading variant="2xl" className="!mb-2">
          Copilot App Bridge Demo
        </Heading>

        <Body variant="lg" tag="p" className="!mb-2 text-gray-500">
          Helper functions for integrating your custom app with your Copilot
          workspace. Our goal is to enable developers to easily make apps that
          look and feel like a part of our software, creating a seamless
          experience for your clients.
        </Body>

        <Body variant="lg" tag="p" className="!mb-2 text-gray-500">
          Try it out below, and watch the header of the Copilot dashboard to see
          what's changing.
        </Body>
      </div>

      <Demo />
    </Container>
  );
}
