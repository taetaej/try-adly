import { Quote } from 'lucide-react'

const proofs = [
  '"OPERA 도입 후 매체 운영 효율이 눈에 띄게 개선되었습니다." — Marketing Lead, A사',
  '"AiQ 인사이트 기반으로 크리에이티브를 최적화한 결과입니다." — Performance Manager, B사',
  '"BUDGET OPTIMIZER가 예산 배분을 자동화해준 덕분에 가능했습니다." — Digital Director, C사',
]

export default function SocialProof() {
  return (
    <section className="w-full py-4 overflow-hidden">
      <div className="flex items-center gap-3 animate-[ticker_40s_linear_infinite] w-max">
        {[...proofs, ...proofs].map((text, i) => (
          <span key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap">
            <Quote className="w-3 h-3 text-muted-foreground/30 rotate-180 shrink-0" />
            <span className="text-xs text-muted-foreground">{text}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
