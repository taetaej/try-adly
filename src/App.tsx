import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientLogos from './components/ClientLogos'
import AppLauncher from './components/AppLauncher'
import Charts from './components/Charts'
import SolutionGate from './components/SolutionGate'
import Ecosystem from './components/Ecosystem'
import Changelog from './components/Changelog'
import SocialProof from './components/SocialProof'
import ContactBanner from './components/ContactBanner'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Threads from './components/Threads'
import { useAuth } from './components/AuthProvider'

export default function App() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Threads background */}
      <div className="pointer-events-none fixed -top-[20vh] left-0 right-0 h-[140vh] z-0 opacity-40 dark:opacity-70">
        <Threads
          color={[0.55, 0.35, 0.85]}
          amplitude={2.5}
          distance={0.3}
          enableMouseInteraction={false}
        />
      </div>

      {/* Fluid glassy orbs — light mode only */}
      <div className="pointer-events-none fixed inset-0 z-[1] dark:hidden">
        <div className="orb-1 absolute top-[-8%] left-[5%] w-[700px] h-[700px] rounded-full bg-white/90 blur-[120px]" />
        <div className="orb-2 absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-white/80 blur-[130px]" />
        <div className="orb-3 absolute top-[55%] left-[15%] w-[800px] h-[800px] rounded-full bg-white/85 blur-[120px]" />
        <div className="orb-1 absolute bottom-[-10%] right-[10%] w-[650px] h-[650px] rounded-full bg-white/75 blur-[110px]" />
        <div className="orb-2 absolute top-[0%] left-[30%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: 'rgba(139, 92, 246, 0.12)' }} />
        <div className="orb-3 absolute top-[40%] right-[5%] w-[550px] h-[550px] rounded-full blur-[140px]" style={{ background: 'rgba(139, 92, 246, 0.08)' }} />
        <div className="orb-1 absolute bottom-[10%] left-[40%] w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(139, 92, 246, 0.10)' }} />
        <div className="orb-3 absolute top-[10%] left-[55%] w-[400px] h-[400px] rounded-full bg-black/[0.04] blur-[90px]" />
        <div className="orb-1 absolute top-[65%] left-[-3%] w-[500px] h-[500px] rounded-full bg-black/[0.05] blur-[100px]" />
        <div className="orb-2 absolute top-[28%] left-[65%] w-[250px] h-[250px] rounded-full bg-white/70 blur-[60px]" />
        <div className="orb-3 absolute top-[75%] right-[25%] w-[300px] h-[300px] rounded-full bg-white/60 blur-[70px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          {isLoggedIn && <AppLauncher />}
          <Charts />
          <SolutionGate />
          <Ecosystem />
          {/* <SocialProof /> */}
          <ContactBanner />
          <section className="w-full px-5 pt-12 pb-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Changelog />
              <FAQ />
            </div>
          </section>
          <ClientLogos />
        </main>
        <Footer />
      </div>
    </div>
  )
}
