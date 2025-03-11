'use client';

import { useEffect, useMemo } from 'react';

type Icons = 'Archive' | 'Plus' | 'Templates' | 'Trash';

interface BreadcrumbsPayload {
  items: {
    label: string;
    onClick: string;
  }[];
  type: 'header.breadcrumbs';
}

interface PrimaryCtaPayload {
  icon?: Icons;
  label: string;
  onClick?: string;
  type: 'header.primaryCta';
}

interface SecondaryCtaPayload {
  icon?: Icons;
  label: string;
  onClick?: string;
  type: 'header.secondaryCta';
}

interface ActionsMenuPayload {
  items: {
    label: string;
    onClick: string;
    icon?: Icons;
  }[];
  type: 'header.actionsMenu';
}

interface Clickable {
  label: string;
  onClick?: () => void;
  icon?: Icons;
}

const getBreadcrumbId = (idx: number) => `header.breadcrumbs.${idx}`;
const getActionMenuItemId = (idx: number) => `header.actionsMenu.${idx}`;

const ensureHttps = (url: string) => {
  if (url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return `https://${url}`;
};

export function useBreadcrumbs(
  breadcrumbs: Clickable[],
  config?: {
    portalUrl?: string;
  },
) {
  const callbackRefs = useMemo(() => {
    return breadcrumbs.reduce<Record<string, () => void>>(
      (acc, { onClick }, idx) => {
        if (onClick) acc[getBreadcrumbId(idx)] = onClick;
        return acc;
      },
      {},
    );
  }, [breadcrumbs]);

  useEffect(() => {
    const payload: BreadcrumbsPayload = {
      type: 'header.breadcrumbs',
      items: breadcrumbs.map(({ label, onClick }, idx) => ({
        onClick: onClick ? getBreadcrumbId(idx) : '',
        label,
      })),
    };

    window.parent.postMessage(payload, 'https://dashboard.copilot.app');
    if (config?.portalUrl) {
      window.parent.postMessage(payload, ensureHttps(config.portalUrl));
    }

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
  }, [breadcrumbs, callbackRefs, config?.portalUrl]);

  useEffect(() => {
    const handleUnload = () => {
      window.parent.postMessage(
        { type: 'header.breadcrumbs', items: [] },
        'https://dashboard.copilot.app',
      );
    };
    addEventListener('beforeunload', handleUnload);
    return () => {
      removeEventListener('beforeunload', handleUnload);
    };
  }, []);
}

export function usePrimaryCta(
  primaryCta: Clickable | null,
  config?: { portalUrl?: string },
) {
  useEffect(() => {
    const payload: PrimaryCtaPayload | Pick<PrimaryCtaPayload, 'type'> =
      !primaryCta
        ? { type: 'header.primaryCta' }
        : {
            icon: primaryCta.icon,
            label: primaryCta.label,
            onClick: 'header.primaryCta.onClick',
            type: 'header.primaryCta',
          };

    window.parent.postMessage(payload, 'https://dashboard.copilot.app');
    if (config?.portalUrl) {
      window.parent.postMessage(payload, ensureHttps(config.portalUrl));
    }

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
  }, [primaryCta, config?.portalUrl]);

  useEffect(() => {
    const handleUnload = () => {
      window.parent.postMessage(
        { type: 'header.primaryCta' },
        'https://dashboard.copilot.app',
      );
      if (config?.portalUrl) {
        window.parent.postMessage(
          { type: 'header.primaryCta' },
          ensureHttps(config.portalUrl),
        );
      }
    };
    addEventListener('beforeunload', handleUnload);
    return () => {
      removeEventListener('beforeunload', handleUnload);
    };
  }, [config?.portalUrl]);
}

export function useSecondaryCta(
  secondaryCta: Clickable | null,
  config?: { portalUrl?: string },
) {
  useEffect(() => {
    const payload: SecondaryCtaPayload | Pick<SecondaryCtaPayload, 'type'> =
      !secondaryCta
        ? { type: 'header.secondaryCta' }
        : {
            type: 'header.secondaryCta',
            icon: secondaryCta.icon,
            label: secondaryCta.label,
            onClick: 'header.secondaryCta.onClick',
          };

    window.parent.postMessage(payload, 'https://dashboard.copilot.app');
    if (config?.portalUrl) {
      window.parent.postMessage(payload, ensureHttps(config.portalUrl));
    }

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === 'header.secondaryCta.onClick' &&
        typeof event.data.id === 'string' &&
        secondaryCta?.onClick
      ) {
        secondaryCta.onClick();
      }
    };

    addEventListener('message', handleMessage);

    return () => {
      removeEventListener('message', handleMessage);
    };
  }, [secondaryCta, config?.portalUrl]);

  useEffect(() => {
    const handleUnload = () => {
      window.parent.postMessage(
        { type: 'header.secondaryCta' },
        'https://dashboard.copilot.app',
      );
      if (config?.portalUrl) {
        window.parent.postMessage(
          { type: 'header.secondaryCta' },
          ensureHttps(config.portalUrl),
        );
      }
    };
    addEventListener('beforeunload', handleUnload);
    return () => {
      removeEventListener('beforeunload', handleUnload);
    };
  }, [config?.portalUrl]);
}

export function useActionsMenu(
  actions: Clickable[],
  config?: {
    portalUrl?: string;
  },
) {
  const callbackRefs = useMemo(() => {
    return actions.reduce<Record<string, () => void>>(
      (acc, { onClick }, idx) => {
        if (onClick) acc[getActionMenuItemId(idx)] = onClick;
        return acc;
      },
      {},
    );
  }, [actions]);

  useEffect(() => {
    const payload: ActionsMenuPayload = {
      type: 'header.actionsMenu',
      items: actions.map(({ label, onClick, icon }, idx) => ({
        onClick: onClick ? getActionMenuItemId(idx) : '',
        label,
        icon,
      })),
    };

    window.parent.postMessage(payload, 'https://dashboard.copilot.app');
    if (config?.portalUrl) {
      window.parent.postMessage(payload, ensureHttps(config.portalUrl));
    }

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === 'header.actionsMenu.onClick' &&
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
  }, [actions, callbackRefs, config?.portalUrl]);

  useEffect(() => {
    const handleUnload = () => {
      window.parent.postMessage(
        { type: 'header.actionsMenu', items: [] },
        'https://dashboard.copilot.app',
      );
    };
    addEventListener('beforeunload', handleUnload);
    return () => {
      removeEventListener('beforeunload', handleUnload);
    };
  }, []);
}
