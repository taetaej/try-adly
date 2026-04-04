import { ArrowUpRight } from 'lucide-react'

export default function ContactBanner() {
  return (
    <section className="w-full px-5 pt-12 pb-5">
      <div className="rounded-2xl bg-foreground text-background px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Ready to transform your advertising?</h2>
          <p className="text-sm opacity-60">데이터와 AI 기반의 광고 혁신, 지금 시작하세요.</p>
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground text-sm font-medium hover:opacity-90 transition-opacity shrink-0"
        >
          Contact Us
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  )
}
