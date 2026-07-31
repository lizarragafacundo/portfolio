import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative z-2 mx-auto flex min-h-screen max-w-[1080px] flex-col items-center justify-center gap-6 px-6 text-center">
      <pre
        aria-hidden="true"
        className="text-ac text-glow text-[clamp(8px,2vw,16px)] leading-tight"
      >
        {`┌────────────────┐
│   404 · lost   │
└────────────────┘`}
      </pre>

      <h1 className="text-fg text-xl font-bold">This route does not exist</h1>

      <Link
        href="/en"
        className="border-ac text-ac hover:bg-ac hover:text-bg border px-4 py-2 text-sm font-bold transition-colors"
      >
        ← back home
      </Link>
    </main>
  )
}
