import { useEffect, useRef, useState } from 'react'

function App() {
  const [phase, setPhase] = useState<'launch' | 'lighting' | 'menu'>('launch')
  const firstMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (phase !== 'lighting') return

    const timer = window.setTimeout(() => {
      setPhase('menu')
      window.setTimeout(() => firstMenuButtonRef.current?.focus(), 80)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [phase])

  const handleStart = () => {
    if (phase === 'launch') {
      setPhase('lighting')
    }
  }

  const menuButtons = [
    { label: 'Saves', icon: '📜', description: 'Continue an existing adventure' },
    { label: 'New Save', icon: '✚', description: 'Create a fresh character' },
    { label: 'Settings', icon: '⚙️', description: 'Adjust preferences and controls' }
  ]

  return (
    <div className={`app-root ${phase}`}>
      <div className="background-layer" aria-hidden="true" />

      <main className="center-stage" aria-live="polite">
        {phase === 'launch' && (
          <section className="launch-card" aria-label="Launch screen">
            <div className="crest">⚔</div>
            <h1 className="game-title">The Ironwood Initiative</h1>
            <button className="primary-cta" onClick={handleStart} aria-label="Start your journey">
              Start your journey
            </button>
            <p className="subtitle">Forge your body. Shape your legend.</p>
          </section>
        )}

        {phase === 'lighting' && (
          <section className="launch-card lighting" aria-label="Transition to menu">
            <div className="crest">⚔</div>
            <h1 className="game-title">The Ironwood Initiative</h1>
            <div className="lighting-overlay" aria-hidden="true" />
            <button className="primary-cta" aria-hidden="true" tabIndex={-1}>
              Start your journey
            </button>
            <p className="subtitle">A new dawn is breaking...</p>
          </section>
        )}

        {phase === 'menu' && (
          <section className="menu-card" aria-label="Main menu">
            <div className="menu-header">
              <span className="menu-accent">Operation</span>
              <h2>Main Menu</h2>
            </div>

            <div className="menu-buttons" role="menu" aria-label="Main menu choices">
              {menuButtons.map(({ label, icon, description }, index) => (
                <button
                  key={label}
                  ref={index === 0 ? firstMenuButtonRef : null}
                  className="menu-btn"
                  role="menuitem"
                  onClick={() => alert(`${label} clicked`)}
                >
                  <span className="menu-icon" aria-hidden="true">{icon}</span>
                  <span className="menu-text-wrap">
                    <span className="menu-label">{label}</span>
                    <small>{description}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
