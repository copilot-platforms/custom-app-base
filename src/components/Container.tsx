const GUTTERS_CLASSNAME = 'px-5 md:px-9 py-16';

/**
 * The container component is a good wrapper that matches the
 * layout of center aligned apps in Copilot.
 */
export function Container({
  children,
  className = '',
  gutters = true,
}: {
  children: React.ReactNode;
  className?: string;
  gutters?: boolean;
}) {
  return (
    <main
      className={[
        'flex min-h-screen flex-col place-self-center max-w-full',
        gutters ? GUTTERS_CLASSNAME : '',
        className,
      ].join(' ')}
    >
      {children}
    </main>
  );
}
