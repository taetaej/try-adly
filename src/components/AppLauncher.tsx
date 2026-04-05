import { Lock, Megaphone, ChevronRight, ArrowUpRight } from 'lucide-react'

interface AppItem {
  name: string
  available: boolean
}

const apps: AppItem[] = [
  // Explore
  { name: 'DATASHOT', available: true },
  { name: 'CRE-CHECKER', available: true },
  // Strategize
  { name: 'BUDGET OPTIMIZER', available: false },
  { name: 'REACH CASTER', available: false },
  // Orchestrate
  { name: 'OPERA', available: true },
  { name: 'IFAd', available: true },
  { name: 'BIDOPT', available: false },
  { name: 'BIDAUTO', available: true },
  // Insight
  { name: 'AiQ', available: true },
  { name: 'INTELLA', available: true },
  { name: 'AIM', available: false },
  { name: 'Mean It', available: true },
]

const advertisers = [
  { name: 'Brand A', color: 'bg-foreground' },
  { name: 'Brand B', color: 'bg-muted-foreground' },
  { name: 'Brand C', color: 'bg-foreground/60' },
]

const notices = [
  'OPERA v3.2 업데이트 — 자동 입찰 기능이 개선되었습니다',
  'AiQ 신규 리포트 템플릿 3종 추가',
  '시스템 점검 안내: 4/12(토) 02:00–04:00',
]

export default function AppLauncher() {
  return (
    <section className="w-full px-5 pb-5">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 mb-5">
        {/* Left — Title + Advertiser profiles + request */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold">Solution Launcher</h2>
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-2">My Clients</h3>
            <div className="flex items-center">
              <div className="flex -space-x-2.5">
                {advertisers.map(adv => (
                  <div key={adv.name} className={`w-8 h-8 rounded-full ${adv.color} border-2 border-background flex items-center justify-center`}>
                    <span className="text-[9px] font-bold text-background">{adv.name.charAt(0)}</span>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground ml-3">{advertisers.length} clients</span>
            </div>
          </div>

          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
            Request Service
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right — App grid */}
        <div>
          <div className="grid grid-cols-6 gap-2">
            {apps.map(app => (
              <button
                key={app.name}
                disabled={!app.available}
                className={`group flex items-center justify-center gap-1.5 px-2 py-6 rounded-xl text-xs font-medium transition-all ${
                  app.available
                    ? 'bg-black/[0.06] dark:bg-white/[0.08] hover:bg-foreground hover:text-background dark:hover:bg-white dark:hover:text-black cursor-pointer'
                    : 'bg-black/[0.03] dark:bg-white/[0.04] text-muted-foreground/70 cursor-not-allowed'
                }`}
              >
                {!app.available && <Lock className="w-2.5 h-2.5" />}
                {app.name.toUpperCase()}
                {app.available && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notice ticker bar — separator */}
      <div className="rounded-full bg-foreground text-background px-4 py-2 flex items-center gap-3 overflow-hidden">
        <Megaphone className="w-3.5 h-3.5 shrink-0 opacity-60" />
        <div className="flex-1 overflow-hidden">
          <div className="animate-[ticker_20s_linear_infinite] whitespace-nowrap flex gap-12">
            {[...notices, ...notices].map((n, i) => (
              <span key={i} className="text-xs">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
