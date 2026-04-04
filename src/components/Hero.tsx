import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full px-5 pt-10 pb-8 relative overflow-hidden">
      <div className="relative z-10">
        {/* Key message */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground font-medium tracking-[0.05em] uppercase mb-6">
            AN INNOVATION BY CJ MEZZOMEDIA
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08]">
            End-to-End Digital Advertising
            <br />
            Powered by Data & AI
          </h1>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Launch Opera
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 text-sm font-medium hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
          >
            Explore Solutions
          </a>
        </div>
      </div>
    </section>
  )
}
