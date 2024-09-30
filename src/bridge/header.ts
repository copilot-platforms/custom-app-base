'use client';

import { useEffect, useMemo } from 'react';

interface BreadcrumbsPayload {
  type: 'header.breadcrumbs';
  items: {
    label: string;
    onClick: string;
  }[];
}

interface PrimaryCtaPayload {
  type: 'header.primaryCta';
  label: string;
  onClick: string;
}

interface ClickableProps {
  label: string;
  onClick: () => void;
}

const getBreadcrumbId = (idx: number) => `header.breadcrumbs.${idx}`;

export function useBreadcrumbs(breadcrumbs: ClickableProps[]) {
  const callbackRefs = useMemo(() => {
    return breadcrumbs.reduce<Record<string, () => void>>(
      (acc, { onClick }, idx) => {
        acc[getBreadcrumbId(idx)] = onClick;
        return acc;
      },
      {},
    );
  }, [breadcrumbs]);

  const payload: BreadcrumbsPayload = {
    type: 'header.breadcrumbs',
    items: breadcrumbs.map(({ label }, idx) => ({
      onClick: getBreadcrumbId(idx),
      label,
    })),
  };

  useEffect(() => {
    window.parent.postMessage(payload, 'https://dashboard.copilot.com');

    // Be sure to add your portal domain here as well, whether it's a copilot.app
    // subdomain or a custom domain. This allows the two frames to talk to each other.
    // window.parent.postMessage(payload, 'https://yourportaldomain.copilot.app');

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === 'header.breadcrumbs.onClick' &&
        typeof event.data.id === 'string' &&
        callbackRefs[event.data.id]
      ) {
        callbackRefs[event.data.id]();
      }
    };

    addEventListener('message', handleMessage);

    return () => {
      removeEventListener('message', handleMessage);
    };
  }, [breadcrumbs, payload]);
}

export function usePrimaryCta(primaryCta: ClickableProps | null) {
  const payload: PrimaryCtaPayload | Pick<PrimaryCtaPayload, 'type'> =
    !primaryCta
      ? { type: 'header.primaryCta' }
      : {
          type: 'header.primaryCta',
          label: primaryCta.label,
          onClick: 'header.primaryCta.onClick',
        };

  useEffect(() => {
    window.parent.postMessage(payload, 'https://dashboard.copilot.com');

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === 'header.primaryCta.onClick' &&
        typeof event.data.id === 'string' &&
        primaryCta?.onClick
      ) {
        primaryCta.onClick();
      }
    };

    addEventListener('message', handleMessage);

    return () => {
      removeEventListener('message', handleMessage);
    };
  }, [primaryCta]);
}
