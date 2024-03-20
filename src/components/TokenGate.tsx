export function TokenGate({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: SearchParams;
}) {
  if (!searchParams.token && process.env.COPILOT_ENV !== 'local') {
    throw new Error(
      'This app requires a token to be passed in the URL. Please check the URL and try again.',
    );
  }

  return children;
}
