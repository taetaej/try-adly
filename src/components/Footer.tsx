

const links = {
  Product: ['Features', 'Pricing', 'Changelog', 'Docs'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security'],
  Connect: ['Twitter', 'GitHub', 'Discord', 'LinkedIn'],
}

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="px-5 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center mb-3">
              <img src="/adly-logo-B.png" alt="Adly" className="h-4 dark:hidden" />
              <img src="/adly-logo.png" alt="Adly" className="h-4 hidden dark:block" />
            </a>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              End-to-end digital advertising powered by data & AI.
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold mb-2.5 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-muted-foreground">
          <p>&copy; 2026 Adly. All rights reserved.</p>
          <p>Built with care for modern advertisers.</p>
        </div>
      </div>
    </footer>
  )
}
