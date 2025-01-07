/* eslint react/no-unescaped-entities: 0 */

'use client';

import {
  useActionsMenu,
  useBreadcrumbs,
  usePrimaryCta,
  useSecondaryCta,
} from '@/bridge/header';
import {
  Body,
  Heading,
  Icon,
  IconButton,
  SecondaryButton,
} from 'copilot-design-system';
import { useState } from 'react';
import { CopyBlock, monoBlue } from 'react-code-blocks';

export function Demo({ portalUrl }: { portalUrl?: string }) {
  const [breadcrumbValues, setBreadcrumbValues] = useState<string[]>([]);
  const [actionsMenuItems, setActionsMenuItems] = useState<string[]>([]);
  const [primaryCallToAction, setPrimaryCallToAction] = useState<string | null>(
    null,
  );
  const [secondaryCallToAction, setSecondaryCallToAction] = useState<
    string | null
  >(null);

  useBreadcrumbs(
    breadcrumbValues.map((value) => ({
      label: value,
      onClick: () => {
        alert(`Clicked on ${value}`);
      },
    })),
    { portalUrl },
  );

  useActionsMenu(
    actionsMenuItems.map((value) => ({
      icon: 'Plus',
      label: value,
      onClick: () => {
        alert(`Clicked on ${value}`);
      },
    })),
    { portalUrl },
  );

  usePrimaryCta(
    !primaryCallToAction
      ? null
      : {
          label: primaryCallToAction,
          onClick: () => {
            alert(`Clicked on ${primaryCallToAction}`);
          },
        },
    { portalUrl },
  );

  useSecondaryCta(
    !secondaryCallToAction
      ? null
      : {
          label: secondaryCallToAction,
          onClick: () => {
            alert(`Clicked on ${secondaryCallToAction}`);
          },
        },
    { portalUrl },
  );

  return (
    <>
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

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div>
          {/* Breadcrumbs */}
          <section className="grid grid-cols-12 items-baseline gap-4">
            <div className="col-span-3">
              <Body variant="base" tag="span" className="text-gray-500">
                Breadcrumbs:
              </Body>
            </div>

            <div className="col-span-9 flex flex-row flex-wrap mb-4 gap-4">
              {breadcrumbValues.map((value, index) => (
                <div
                  key={`breadcrumb-${value}-${index}`}
                  className="bg-slate-100 flex flex-row rounded whitespace-nowrap"
                >
                  <input
                    className="text-sm bg-transparent px-4"
                    value={value}
                    onChange={(e) => {
                      setBreadcrumbValues((breadcrumbValues) => {
                        const newValues = [...breadcrumbValues];
                        newValues[index] = e.target?.value;
                        return newValues;
                      });
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      'use client';
                      setBreadcrumbValues((breadcrumbValues) => {
                        const newValues = [...breadcrumbValues];
                        newValues.splice(index, 1);
                        return newValues;
                      });
                    }}
                    icon="Close"
                    label="Remove breadcrumb"
                  />
                </div>
              ))}

              <SecondaryButton
                onClick={() => {
                  'use client';
                  setBreadcrumbValues((breadcrumbValues) => [
                    ...breadcrumbValues,
                    `Subpage ${breadcrumbValues.length + 1}`,
                  ]);
                }}
                label="Add a breadcrumb"
                disclosure={false}
              />
            </div>
          </section>

          {/* Actions menu */}
          <section className="grid grid-cols-12 items-baseline gap-4">
            <div className="col-span-3">
              <Body variant="base" tag="span" className="text-gray-500">
                Actions Menu:
              </Body>
            </div>

            <div className="col-span-9 flex flex-row flex-wrap mb-4 gap-4">
              {actionsMenuItems.map((value, index) => (
                <div
                  key={`breadcrumb-${value}-${index}`}
                  className="bg-slate-100 flex flex-row rounded whitespace-nowrap"
                >
                  <input
                    className="text-sm bg-transparent px-4"
                    value={value}
                    onChange={(e) => {
                      setBreadcrumbValues((breadcrumbValues) => {
                        const newValues = [...breadcrumbValues];
                        newValues[index] = e.target?.value;
                        return newValues;
                      });
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      'use client';
                      setActionsMenuItems((actionsMenuItems) => {
                        const newValues = [...actionsMenuItems];
                        newValues.splice(index, 1);
                        return newValues;
                      });
                    }}
                    icon="Close"
                    label="Remove action"
                  />
                </div>
              ))}

              <SecondaryButton
                onClick={() => {
                  'use client';
                  setActionsMenuItems((actionsMenuItems) => [
                    ...actionsMenuItems,
                    `Action ${actionsMenuItems.length + 1}`,
                  ]);
                }}
                label="Add an action"
                disclosure={false}
              />
            </div>
          </section>

          {/* Primary CTA */}
          <section className="grid grid-cols-12 items-baseline gap-4">
            <div className="col-span-3">
              <Body variant="base" tag="span" className="text-gray-500">
                Primary Call to Action:
              </Body>
            </div>

            <div className="col-span-9">
              <div className="flex rounded">
                <div className="flex flex-row bg-slate-100 rounded">
                  <input
                    className="text-sm bg-transparent py-2 px-4"
                    value={primaryCallToAction ?? ''}
                    onChange={(e) => {
                      setPrimaryCallToAction(e.target?.value || null);
                    }}
                  />

                  <IconButton
                    onClick={() => {
                      'use client';
                      setPrimaryCallToAction(null);
                    }}
                    icon="Close"
                    label="Remove primary call to action"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Secondary CTA */}
          <section className="grid grid-cols-12 items-baseline gap-4">
            <div className="col-span-3">
              <Body variant="base" tag="span" className="text-gray-500">
                Secondary Call to Action:
              </Body>
            </div>

            <div className="col-span-9">
              <div className="flex rounded">
                <div className="flex flex-row bg-slate-100 rounded">
                  <input
                    className="text-sm bg-transparent py-2 px-4"
                    value={secondaryCallToAction ?? ''}
                    onChange={(e) => {
                      setSecondaryCallToAction(e.target?.value || null);
                    }}
                  />

                  <IconButton
                    onClick={() => {
                      'use client';
                      setSecondaryCallToAction(null);
                    }}
                    icon="Close"
                    label="Remove secondary call to action"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <code className="text-sm font-mono">
            <CopyBlock
              codeBlockStyle={{
                fontFamily: 'monospace',
              }}
              codeBlock
              text={`'use client';

import { useBreadcrumbs, usePrimaryCta } from '@/bridge/header';

// Render this component in your page.tsx component, you can 
// use props to pass in dynamic values from the API.
export function ExampleAppBridge() {
  useBreadcrumbs([
${breadcrumbValues
  .map(
    (value) =>
      `    {
      label: '${value}',
      onClick: () => alert('Clicked on ${value}'),
    },`,
  )
  .join('\n')}
  ]);

  usePrimaryCta(${
    primaryCallToAction
      ? `{
    label: '${primaryCallToAction}',
    onClick: () => alert('Clicked on ${primaryCallToAction}'),
  }`
      : 'null'
  });

  return null;
}
`}
              language="typescript"
              showLineNumbers={true}
              theme={monoBlue}
            />
          </code>
        </div>
      </div>
    </>
  );
}
