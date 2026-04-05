import { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Menu, X, Settings, LogOut } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'

const navItems = [
  { label: 'Launcher', active: true },
  { label: 'Market Insight' },
  { label: 'Ecosystem' },
  { label: 'FAQ' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { isLoggedIn, toggleAuth } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="">
        <div className="px-5 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img src="/adly-logo-B.png" alt="Adly" className="h-5 dark:hidden" />
            <img src="/adly-logo.png" alt="Adly" className="h-5 hidden dark:block" />
          </a>

          {/* Pill tabs */}
          <nav className="hidden md:flex items-center bg-black/[0.04] dark:bg-white/[0.06] rounded-full p-1 gap-0.5">
            {navItems.map(item => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  item.active
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isLoggedIn ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  JS
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-xl bg-background border border-border/50 shadow-lg py-1 z-50">
                    <button
                      onClick={() => { setProfileOpen(false) }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Settings
                    </button>
                    <button
                      onClick={() => { toggleAuth(); setProfileOpen(false) }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={toggleAuth}
                className="hidden md:inline-flex px-4 py-1.5 text-xs font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Sign in
              </button>
            )}

            <button
              className="md:hidden p-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 pt-1 flex flex-col gap-1">
            {navItems.map(item => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
