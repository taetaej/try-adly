const updates = [
  { date: '2026.03.28', tag: 'NEW', title: 'AiQ 리포트 템플릿 3종 추가' },
  { date: '2026.03.15', tag: 'UPDATE', title: 'OPERA v3.2 자동 입찰 개선' },
  { date: '2026.03.01', tag: 'NEW', title: 'Mean It 솔루션 런칭' },
  { date: '2026.02.20', tag: 'UPDATE', title: 'INTELLA 대시보드 리뉴얼' },
  { date: '2026.02.10', tag: 'FIX', title: 'BIDOPT 안정성 개선' },
]

const tagStyle: Record<string, string> = {
  NEW: 'bg-foreground text-background',
  UPDATE: 'bg-black/[0.06] dark:bg-white/[0.08] text-foreground',
  FIX: 'bg-black/[0.04] dark:bg-white/[0.05] text-muted-foreground',
}

export default function Changelog() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-4">Updates</h2>
      <div className="space-y-1.5">
        {updates.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-[11px] rounded-xl bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl"
          >
            <span className="text-[10px] text-muted-foreground w-20 shrink-0 tabular-nums">{item.date}</span>
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${tagStyle[item.tag]}`}>
              {item.tag}
            </span>
            <span className="text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
