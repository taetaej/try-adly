import { useState } from 'react'
import { X } from 'lucide-react'

const glassCard = 'rounded-2xl bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)]'

interface Solution {
  name: string
  summary: string
}

interface Phase {
  step: string
  name: string
  desc: string
  solutions: Solution[]
}

const phases: Phase[] = [
  {
    step: '01',
    name: 'Explore',
    desc: '데이터 기반으로 새로운 기회를 포착하고 발굴하는 솔루션',
    solutions: [
      { name: 'DATASHOT', summary: '시장 트렌드와 경쟁사 데이터를 한눈에 탐색' },
      { name: 'CRE-CHECKER', summary: '크리에이티브 소재의 성과를 사전 진단' },
    ],
  },
  {
    step: '02',
    name: 'Strategize',
    desc: '데이터 기반 효과적인 전략과 방향 설계를 안내하는 솔루션',
    solutions: [
      { name: 'BUDGET OPTIMIZER', summary: '예산 배분을 자동으로 최적화' },
      { name: 'REACH CASTER', summary: '타겟 도달률 기반 매체 믹스 설계' },
    ],
  },
  {
    step: '03',
    name: 'Orchestrate',
    desc: '최적화된 광고 운영 관리, 조정, 실행이 가능한 솔루션',
    solutions: [
      { name: 'OPERA', summary: '통합 광고 운영 및 자동 집행 플랫폼' },
      { name: 'IFAd', summary: '인피드 광고 자동 최적화' },
      { name: 'BIDOPT', summary: '실시간 입찰 최적화 엔진' },
      { name: 'BIDAUTO', summary: '자동 입찰 전략 관리' },
    ],
  },
  {
    step: '04',
    name: 'Insight',
    desc: '탐지, 리포팅, 분석을 통한 인사이트를 도출하는 솔루션',
    solutions: [
      { name: 'AiQ', summary: 'AI 기반 광고 성과 인사이트 리포트' },
      { name: 'INTELLA', summary: '광고 데이터 통합 인텔리전스 플랫폼' },
      { name: 'AIM', summary: '어트리뷰션 및 성과 측정 솔루션' },
      { name: 'Mean It', summary: '광고 의미 분석 및 메시지 최적화' },
    ],
  },
]

export default function SolutionGate() {
  const [activeSol, setActiveSol] = useState<Solution | null>(null)

  return (
    <>
      <section id="solutions" className="w-full px-5 pt-12 pb-5">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          <div className="py-2">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Integrated Advertising<br />Intelligence Ecosystem</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              단일 플랫폼에서 모든 광고 채널을<br />
              통합 관리하고 최적화합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {phases.map(phase => (
              <div key={phase.name} className={`${glassCard} p-5 flex flex-col`}>
                <span className="text-[10px] text-muted-foreground mb-1">{phase.step}</span>
                <h3 className="text-xl font-bold mb-2">{phase.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">{phase.desc}</p>
                <div className="mt-auto space-y-1.5">
                  {phase.solutions.map(sol => (
                    <button
                      key={sol.name}
                      onClick={() => setActiveSol(sol)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.07] transition-colors cursor-pointer"
                    >
                      <p className="text-[11px] font-semibold tracking-wide">{sol.name.toUpperCase()}</p>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">{sol.summary}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal overlay */}
      {activeSol && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          onClick={() => setActiveSol(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

          {/* Modal */}
          <div
            className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden animate-[modalIn_0.3s_ease_both]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveSol(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image placeholder */}
            <div className="w-full aspect-[16/9] bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-black/[0.05] dark:bg-white/[0.1] flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg text-muted-foreground">📷</span>
                </div>
                <p className="text-xs text-muted-foreground">Solution Image Placeholder</p>
                <p className="text-[10px] text-muted-foreground/50 mt-1">public/solutions/{activeSol.name.toLowerCase().replace(/\s+/g, '-')}.png</p>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">{activeSol.name}</h3>
              <p className="text-sm text-muted-foreground">{activeSol.summary}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
