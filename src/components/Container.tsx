// Matches the 36px padding in the Copilot dashboard header.
const COPILOT_PADDING = 'p-9';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`${COPILOT_PADDING} flex min-h-screen flex-col items-center justify-between bg-white`}
    >
      {children}
    </main>
  );
}
