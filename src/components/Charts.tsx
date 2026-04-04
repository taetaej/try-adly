import { useState, useEffect, useRef } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from 'recharts'

const glassCard = 'rounded-2xl bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)]'

/* ── 1) 주요 업종별 트렌드 ── */
const industryData = [
  { week: '1주', 식음료: 62, 뷰티: 45, 디지털: 38 },
  { week: '3주', 식음료: 55, 뷰티: 52, 디지털: 42 },
  { week: '5주', 식음료: 70, 뷰티: 48, 디지털: 55 },
  { week: '7주', 식음료: 58, 뷰티: 60, 디지털: 50 },
  { week: '9주', 식음료: 75, 뷰티: 55, 디지털: 62 },
  { week: '11주', 식음료: 68, 뷰티: 65, 디지털: 58 },
  { week: '12주', 식음료: 72, 뷰티: 58, 디지털: 65 },
]

const industryColors = ['#1a1a1a', '#888888', '#cccccc']
const industryColorsDark = ['#e5e5e5', '#999999', '#555555']
const industryKeys = ['식음료', '뷰티', '디지털'] as const

/* ── 2) Google Ads 요일별 지표 비교 ── */
const googleAdsData = [
  { day: 'Mon', CTR: 45, 광고비: 32 },
  { day: 'Tue', CTR: 72, 광고비: 55 },
  { day: 'Wed', CTR: 58, 광고비: 48 },
  { day: 'Thu', CTR: 65, 광고비: 52 },
  { day: 'Fri', CTR: 90, 광고비: 60 },
  { day: 'Sat', CTR: 78, 광고비: 55 },
  { day: 'Sun', CTR: 55, 광고비: 42 },
]

/* ── 3) 매체 광고비 비율 ── */
interface MediaDetail {
  name: string
  ratio: number
  color: string
  placements: { name: string; value: number }[]
}

const mediaList: MediaDetail[] = [
  {
    name: 'Meta',
    ratio: 45,
    color: '#1a1a1a',
    placements: [
      { name: '게재지면 1', value: 35 },
      { name: '게재지면 2', value: 28 },
      { name: '게재지면 3', value: 20 },
      { name: '게재지면 4', value: 12 },
      { name: '기타', value: 5 },
    ],
  },
  {
    name: 'Google',
    ratio: 30,
    color: '#666666',
    placements: [
      { name: 'Search', value: 40 },
      { name: 'Display', value: 25 },
      { name: 'YouTube', value: 22 },
      { name: 'Shopping', value: 13 },
    ],
  },
  {
    name: 'Naver',
    ratio: 19,
    color: '#aaaaaa',
    placements: [
      { name: '검색광고', value: 45 },
      { name: '디스플레이', value: 30 },
      { name: '쇼핑검색', value: 15 },
      { name: '브랜드검색', value: 10 },
    ],
  },
]

const mediaDarkColors: Record<string, string> = {
  Meta: '#e5e5e5',
  Google: '#999999',
  Naver: '#666666',
}

/* ── Scorecards ── */
interface StatConfig {
  target: number
  decimals: number
  suffix: string
  label: string
}

const scoreStats: StatConfig[] = [
  { target: 182.5, decimals: 1, suffix: 'K+', label: 'Campaigns' },
  { target: 5400, decimals: 0, suffix: '+', label: 'Brands' },
  { target: 9125, decimals: 0, suffix: '+', label: 'Days of Data' },
  { target: 950.4, decimals: 1, suffix: 'B+', label: 'Records' },
]

function useCountUp(target: number, decimals: number, duration = 2000) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(eased * target)
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()
  return { ref, formatted }
}

function ScoreCard({ stat }: { stat: StatConfig }) {
  const { ref, formatted } = useCountUp(stat.target, stat.decimals)
  return (
    <div ref={ref} className={`${glassCard} p-5 flex flex-col gap-1`}>
      <p className="text-3xl font-bold tracking-tight leading-none tabular-nums">
        {formatted}{stat.suffix}
      </p>
      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
    </div>
  )
}

function PulseCard() {
  const industries = ['식음료', '뷰티', '패션', '디지털', '금융', '게임', '여행', '교육']
  const [selected, setSelected] = useState('')

  return (
    <div className="rounded-2xl bg-foreground text-background p-5 flex flex-col justify-between overflow-hidden relative">
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-32 h-32 rounded-full border border-background animate-[ping_3s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <div className="w-20 h-20 rounded-full border border-background animate-[ping_3s_ease-in-out_0.5s_infinite]" />
      </div>

      <div className="relative">
        <p className="text-sm font-semibold leading-snug">
          Select your<br />industry
        </p>
        <div className="relative mt-2 inline-flex items-center">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            className="text-[10px] bg-transparent text-background/70 border-0 outline-none appearance-none cursor-pointer pr-4"
          >
            <option value="" disabled className="text-foreground">업종 선택 ↓</option>
            {industries.map(ind => (
              <option key={ind} value={ind} className="text-foreground">{ind}</option>
            ))}
          </select>
          <svg className="absolute right-0 w-3 h-3 text-background/50 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>

      <p className="relative text-[8px] text-background/30 mt-auto pt-2">data updated 2026-01-01</p>
    </div>
  )
}

function useIsDark() {
  if (typeof window === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function Charts() {
  const [activeMedia, setActiveMedia] = useState(0)
  const isDark = useIsDark()
  const iColors = isDark ? industryColorsDark : industryColors
  const selected = mediaList[activeMedia]

  return (
    <section className="w-full px-5 pb-5">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Left — Section title */}
        <div className="py-2">
          <h2 className="text-2xl font-bold tracking-tight mb-3 whitespace-nowrap">Market Insight via Data</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            광고 성과와 시장 데이터를 기반으로<br />
            비즈니스에 필요한 인사이트를 제공합니다.
          </p>
        </div>

        {/* Right — Scorecards + Charts */}
        <div className="flex flex-col gap-3">
          {/* Scorecards row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {scoreStats.map(stat => (
              <ScoreCard key={stat.label} stat={stat} />
            ))}
            <PulseCard />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3">
          {/* Left column — 2 charts stacked */}
          <div className="flex flex-col gap-3">
            {/* 주요 업종별 트렌드 */}
            <div className={`${glassCard} p-6 flex-1`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">주요 업종별 트렌드</h3>
                <span className="text-[10px] text-muted-foreground bg-black/[0.03] dark:bg-white/[0.06] rounded-md px-2 py-0.5">최근 12주</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={industryData}>
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '11px' }} />
                  {industryKeys.map((key, i) => (
                    <Line key={key} type="monotone" dataKey={key} stroke={iColors[i]} strokeWidth={1.5} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 justify-end">
                {industryKeys.map((key, i) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <div className="w-2.5 h-[2px] rounded-full" style={{ background: iColors[i] }} />
                    {key}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Ads 요일별 지표 비교 */}
            <div className={`${glassCard} p-6 flex-1`}>
              <h3 className="text-base font-semibold mb-4">Google Ads 요일별 지표 비교</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={googleAdsData} barGap={2}>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="CTR" fill={isDark ? '#e5e5e5' : '#1a1a1a'} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="광고비" fill={isDark ? '#666666' : '#aaaaaa'} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 justify-end">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <div className="w-2.5 h-[2px] rounded-full" style={{ background: isDark ? '#e5e5e5' : '#1a1a1a' }} />CTR
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <div className="w-2.5 h-[2px] rounded-full" style={{ background: isDark ? '#666666' : '#aaaaaa' }} />광고비
                </div>
              </div>
            </div>
          </div>

          {/* Right column — 매체 광고비 비율 (full height, dark card overlay flush bottom) */}
          <div className={`${glassCard} p-6 pb-0 flex flex-col overflow-hidden`}>
            <h3 className="text-base font-semibold mb-4">매체 광고비 비율</h3>

            {/* Stacked bar */}
            <div className="flex w-full h-6 rounded-lg overflow-hidden mb-1">
              {mediaList.map((m, i) => (
                <button
                  key={m.name}
                  onClick={() => setActiveMedia(i)}
                  className={`h-full transition-opacity ${activeMedia === i ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                  style={{
                    width: `${m.ratio}%`,
                    background: isDark ? mediaDarkColors[m.name] : m.color,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mb-4">
              <span>0%</span>
              <div className="flex gap-3">
                {mediaList.map((m, i) => (
                  <button
                    key={m.name}
                    onClick={() => setActiveMedia(i)}
                    className={`transition-colors ${activeMedia === i ? 'text-foreground font-medium' : ''}`}
                  >
                    {m.ratio}% {m.name}
                  </button>
                ))}
              </div>
              <span>100%</span>
            </div>

            {/* Dark card — flush to bottom */}
            <div className="flex-1 bg-[#1a1a1a] rounded-t-2xl p-5 -mx-6 relative overflow-hidden">
              {/* Watermark logo */}
              <img
                src="/adly-logo.png"
                alt=""
                className="absolute bottom-4 right-4 w-80 opacity-[0.06] pointer-events-none select-none"
              />
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white">
                  {selected.name} 게재지면별 비율
                </h4>
                <span className="text-lg font-bold text-white tabular-nums">
                  {selected.placements.length}<span className="text-white/40 font-normal">개</span>
                </span>
              </div>

              <div className="space-y-3">
                {selected.placements.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-[10px] text-white/30 w-4 tabular-nums">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/90">{p.name}</span>
                        <span className="text-xs text-white/50 tabular-nums">{p.value}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-white/40 transition-all"
                          style={{ width: `${p.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
