const logos = [
  // Using simple text-based wordmarks with distinct styling per brand
  { name: 'Google', weight: 400, tracking: '-0.02em', size: 'text-[22px]' },
  { name: 'Meta', weight: 600, tracking: '-0.03em', size: 'text-[22px]' },
  { name: 'amazon', weight: 700, tracking: '-0.02em', size: 'text-[22px]', italic: true },
  { name: 'NIKE', weight: 800, tracking: '0.1em', size: 'text-[18px]' },
  { name: 'Apple', weight: 300, tracking: '-0.02em', size: 'text-[22px]' },
  { name: 'NETFLIX', weight: 700, tracking: '0.15em', size: 'text-[16px]' },
  { name: 'adidas', weight: 700, tracking: '0.08em', size: 'text-[18px]' },
  { name: 'Spotify', weight: 600, tracking: '-0.02em', size: 'text-[22px]' },
  { name: 'SAMSUNG', weight: 600, tracking: '0.12em', size: 'text-[16px]' },
  { name: 'Uber', weight: 700, tracking: '-0.03em', size: 'text-[22px]' },
  { name: 'Airbnb', weight: 600, tracking: '-0.01em', size: 'text-[22px]' },
  { name: 'HYUNDAI', weight: 500, tracking: '0.1em', size: 'text-[16px]' },
]

export default function ClientLogos() {
  const doubled = [...logos, ...logos]

  return (
    <section className="w-full pb-6 pt-2 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-[ticker_35s_linear_infinite] w-max items-center">
          {doubled.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className={`mx-10 ${logo.size} text-foreground/15 select-none whitespace-nowrap`}
              style={{
                fontWeight: logo.weight,
                letterSpacing: logo.tracking,
                fontStyle: logo.italic ? 'italic' : undefined,
              }}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
