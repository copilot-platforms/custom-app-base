export function TokenGate({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: SearchParams;
}) {
  console.log({ COPILOT_ENV: process.env.COPILOT_ENV !== 'local' });
  if (!searchParams.token && process.env.COPILOT_ENV !== 'local') {
    throw new Error(
      'Session Token is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-the-sdk#session-tokens',
    );
  }

  return children;
}
