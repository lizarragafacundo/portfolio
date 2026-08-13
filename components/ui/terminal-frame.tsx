export function TerminalFrame({
  title,
  status,
  children,
}: {
  title: string
  status?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="border-border bg-surface-2 border">
      <div className="border-border flex items-center gap-[7px] border-b px-3 py-2">
        <Dot className="bg-[oklch(0.62_0.2_25)]" />
        <Dot className="bg-[oklch(0.78_0.16_90)]" />
        <Dot className="bg-[oklch(0.72_0.16_150)]" />
        <span className="text-fg-mute ml-1.5 text-[11px]">{title}</span>
      </div>

      <div className="px-3.5 py-3">{children}</div>

      {status ? (
        <div className="border-border text-fg-mute flex justify-between border-t px-3 py-[7px] text-[10px]">
          {status}
        </div>
      ) : null}
    </div>
  )
}

function Dot({ className }: { className: string }) {
  return <span aria-hidden="true" className={`inline-block size-[9px] rounded-full ${className}`} />
}
