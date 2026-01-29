'use client';

import { useEffect, useMemo } from 'react';
import {
  AssemblyBridge,
  type BreadcrumbItem,
  type CtaConfig,
  type ActionMenuItem,
  type CtaIcon,
  type Icon,
} from '@assembly-js/app-bridge';

/**
 * Configuration for a clickable item (breadcrumb, CTA, or action menu item).
 */
interface Clickable {
  label: string;
  onClick?: () => void;
  icon?: Icon;
}

/**
 * React hook to set breadcrumb navigation items in the header.
 * Items are automatically cleared when the component unmounts.
 *
 * @param breadcrumbs - Array of breadcrumb items with labels and optional click handlers
 *
 * @example
 * useBreadcrumbs([
 *   { label: 'Home' },
 *   { label: 'Settings', onClick: () => router.push('/settings') }
 * ]);
 */
export function useBreadcrumbs(breadcrumbs: Clickable[]) {
  const items: BreadcrumbItem[] = useMemo(
    () =>
      breadcrumbs.map(({ label, onClick }) => ({
        label,
        onClick,
      })),
    [breadcrumbs],
  );

  useEffect(() => {
    AssemblyBridge.header.setBreadcrumbs(items);
    return () => {
      AssemblyBridge.header.setBreadcrumbs([]);
    };
  }, [items]);
}

/**
 * React hook to set the primary CTA button in the header.
 * The button is automatically cleared when the component unmounts.
 *
 * @param config - CTA configuration with label, optional icon, and click handler, or null to clear
 *
 * @example
 * usePrimaryCta({
 *   label: 'Save',
 *   icon: 'Check',
 *   onClick: () => handleSave()
 * });
 */
export function usePrimaryCta(config: Clickable | null) {
  const ctaConfig: CtaConfig | null = useMemo(() => {
    if (!config || !config.onClick) return null;
    return {
      label: config.label,
      icon: config.icon as CtaIcon | undefined,
      onClick: config.onClick,
    };
  }, [config]);

  useEffect(() => {
    AssemblyBridge.header.setPrimaryCta(ctaConfig);
    return () => {
      AssemblyBridge.header.setPrimaryCta(null);
    };
  }, [ctaConfig]);
}

/**
 * React hook to set the secondary CTA button in the header.
 * The button is automatically cleared when the component unmounts.
 *
 * @param config - CTA configuration with label, optional icon, and click handler, or null to clear
 *
 * @example
 * useSecondaryCta({
 *   label: 'Cancel',
 *   onClick: () => handleCancel()
 * });
 */
export function useSecondaryCta(config: Clickable | null) {
  const ctaConfig: CtaConfig | null = useMemo(() => {
    if (!config || !config.onClick) return null;
    return {
      label: config.label,
      icon: config.icon as CtaIcon | undefined,
      onClick: config.onClick,
    };
  }, [config]);

  useEffect(() => {
    AssemblyBridge.header.setSecondaryCta(ctaConfig);
    return () => {
      AssemblyBridge.header.setSecondaryCta(null);
    };
  }, [ctaConfig]);
}

/**
 * React hook to set the actions dropdown menu in the header.
 * The menu is automatically cleared when the component unmounts.
 *
 * @param actions - Array of action items with labels, optional icons, and click handlers
 *
 * @example
 * useActionsMenu([
 *   { label: 'Archive', icon: 'Archive', onClick: () => handleArchive() },
 *   { label: 'Delete', icon: 'Trash', onClick: () => handleDelete() }
 * ]);
 */
export function useActionsMenu(actions: Clickable[]) {
  const items: ActionMenuItem[] = useMemo(
    () =>
      actions
        .filter((action) => action.onClick !== undefined)
        .map(({ label, icon, onClick }) => ({
          label,
          icon,
          onClick: onClick!,
        })),
    [actions],
  );

  useEffect(() => {
    AssemblyBridge.header.setActionsMenu(items);
    return () => {
      AssemblyBridge.header.setActionsMenu([]);
    };
  }, [items]);
}
