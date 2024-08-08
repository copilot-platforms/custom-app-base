export function TokenGate({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: SearchParams;
}) {
  if (!searchParams.token && process.env.COPILOT_ENV !== 'local') {

    //console.log(searchParams)
    throw new Error(
      'Session Token is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-the-sdk#session-tokens',
    );
  }

   console.log("search"+searchParams)

  return children;
}
