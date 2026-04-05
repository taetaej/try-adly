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
  { name: 'Google', logo: '/clients/google.svg' },
  { name: 'Meta', logo: '/clients/meta.svg' },
  { name: 'Amazon', logo: '/clients/amazon.svg' },
]

const notices = [
  '[정기점검] 2026년 4월 9일(수) 18:00~20:00 시스템 정기점검이 진행됩니다. 점검 중 OPERA, BIDOPT, BIDAUTO 서비스 이용이 일시 중단됩니다.',
  '[공지] AiQ v2.1 업데이트 — 업종별 벤치마크 리포트 기능이 추가되었습니다. 자세한 내용은 Updates를 확인해주세요.',
  '[안내] 2026년 4월 광고 성과 데이터는 매일 09:00 기준으로 갱신됩니다.',
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
                {advertisers.map((adv, i) => {
                  const bgs = ['bg-neutral-200 dark:bg-neutral-700', 'bg-neutral-300 dark:bg-neutral-600', 'bg-neutral-400 dark:bg-neutral-500']
                  return (
                    <div key={adv.name} className={`w-8 h-8 rounded-full ${bgs[i]} border-2 border-background flex items-center justify-center overflow-hidden`}>
                      <img src={adv.logo} alt={adv.name} className="w-4 h-4 object-contain dark:invert" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-[9px] font-bold text-muted-foreground">${adv.name.charAt(0)}</span>` }} />
                    </div>
                  )
                })}
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
