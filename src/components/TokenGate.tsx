interface PropsBase {
  searchParams: SearchParams;
}

export function TokenGate({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: SearchParams;
}) {
  if (!searchParams.token && process.env.COPILOT_ENV !== 'local') {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center p-24">
        <h1 className="text-8xl font-semibold text-center">401</h1>
        <p className="text-2xl font-semibold text-center">
          Please provide a token to access the content.
        </p>
      </main>
    );
  }

  return children;
}
