'use client';

import { useBreadcrumbs, usePrimaryCta } from '@/bridge/header';

export function AppBridgeHeader() {
  useBreadcrumbs([
    {
      label: 'Subpage',
      onClick: () => {
        console.log('testing one');
      },
    },
  ]);

  usePrimaryCta({
    label: 'New Task',
    onClick: () => {
      console.log('testing three');
    },
  });
  return null;
}
