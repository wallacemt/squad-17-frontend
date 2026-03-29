export function VaultPageBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-30 bg-bg-body" />

      <div className="pointer-events-none fixed inset-0 -z-20 bg-accent/5 opacity-55">
        <svg aria-hidden="true" focusable="false" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vault-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0v48" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vault-grid)" />
        </svg>
      </div>

      {/* <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(255,193,7,0.2),transparent_32%),radial-gradient(circle_at_78%_14%,rgba(0,200,180,0.12),transparent_30%),radial-gradient(circle_at_52%_84%,rgba(255,132,0,0.12),transparent_34%)]" /> */}
    </>
  );
}
