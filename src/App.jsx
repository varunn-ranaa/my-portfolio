import { useState, useEffect, useRef } from "react"
import Hero from "./components/me.jsx"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

// ─── Premium Smooth Scroll Engine ───────────────────────────────────────────
function useSmoothScroll() {
  useEffect(() => {
    let currentY = 0
    let targetY = 0
    let rafId = null
    let isScrolling = false
    const LERP = 0.09

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    const scroller = document.getElementById("__smooth_root__")

    // Sync window.scrollY so IntersectionObservers / hero fade work
    Object.defineProperty(window, "scrollY", {
      get: () => currentY,
      configurable: true,
    })

    function getMaxScroll() {
      return Math.max(0, (scroller?.scrollHeight || 0) - window.innerHeight)
    }

    function tick() {
      // Nav jump injection — engine polls this every frame
      if (window.__smoothNavTarget__ !== undefined) {
        targetY = Math.max(0, Math.min(getMaxScroll(), window.__smoothNavTarget__))
        window.__smoothNavTarget__ = undefined
      }

      const diff = targetY - currentY
      if (Math.abs(diff) < 0.05) {
        currentY = targetY
        if (scroller) scroller.style.transform = `translateY(${-currentY}px)`
        isScrolling = false
        rafId = null
        return
      }
      currentY += diff * LERP
      if (scroller) scroller.style.transform = `translateY(${-currentY}px)`
      rafId = requestAnimationFrame(tick)
    }

    function startTick() {
      if (!isScrolling) {
        isScrolling = true
        rafId = requestAnimationFrame(tick)
      }
    }

    function onWheel(e) {
      e.preventDefault()
      targetY = Math.max(0, Math.min(getMaxScroll(), targetY + e.deltaY))
      startTick()
    }

    let touchStartY = 0
    function onTouchStart(e) { touchStartY = e.touches[0].clientY }
    function onTouchMove(e) {
      e.preventDefault()
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      targetY = Math.max(0, Math.min(getMaxScroll(), targetY + dy))
      startTick()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])
}

// ─── Nav Scroll ──────────────────────────────────────────────────────────────
function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return

  // Walk offsetParent chain — immune to translateY, reads true layout offset
  let offsetTop = 0
  let node = el
  const root = document.getElementById("__smooth_root__")
  while (node && node !== root) {
    offsetTop += node.offsetTop
    node = node.offsetParent
  }

  // Inject into engine — it picks this up next RAF tick
  window.__smoothNavTarget__ = offsetTop
  // Kick the RAF loop if idle
  window.dispatchEvent(new Event("__smooth_kick__"))
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [hovered, setHovered] = useState(false)
  const ballDomRef = useRef(null)
  const heroRef = useRef(null)
  const targetOpacity = useRef(1)
  const currentOpacity = useRef(1)

  useSmoothScroll()

  // Kick engine when nav fires (in case RAF loop was idle)
  useEffect(() => {
    const kick = () => {
      // Just dispatching the event is enough — engine picks up __smoothNavTarget__ next frame
      // We need to ensure isScrolling restarts; simplest: dispatch a tiny wheel event
      window.dispatchEvent(new WheelEvent("wheel", { deltaY: 0, bubbles: true }))
    }
    window.addEventListener("__smooth_kick__", kick)
    return () => window.removeEventListener("__smooth_kick__", kick)
  }, [])

  // Cursor ball lerp
  useEffect(() => {
    let mouseX = -100, mouseY = -100
    let ballX = -100, ballY = -100
    let animId

    const handleMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }

    const animate = () => {
      ballX += (mouseX - ballX) * 0.08
      ballY += (mouseY - ballY) * 0.08
      if (ballDomRef.current) {
        ballDomRef.current.style.left = ballX + "px"
        ballDomRef.current.style.top = ballY + "px"
      }
      currentOpacity.current += (targetOpacity.current - currentOpacity.current) * 0.06
      if (heroRef.current) {
        heroRef.current.style.opacity = currentOpacity.current
      }
      animId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMove)
    animId = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Hero fade — reads custom window.scrollY
  useEffect(() => {
    let rafId
    const update = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const fadeStart = vh * 0.1
      const fadeEnd = vh * 0.6
      const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)
      const eased = progress * progress * (3 - 2 * progress)
      targetOpacity.current = 1 - eased
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: #0d0d0d;
          overflow: hidden;
          height: 100%;
          scrollbar-width: none;
        }
        ::-webkit-scrollbar { display: none; }
        #__smooth_root__ {
          will-change: transform;
          position: fixed;
          top: 0; left: 0;
          width: 100%;
        }
      `}</style>

      {/* CURSOR BALL */}
      <div ref={ballDomRef} style={{
        position: "fixed", left: "-100px", top: "-100px",
        width: hovered ? "18rem" : "14px",
        height: hovered ? "18rem" : "14px",
        borderRadius: "50%",
        background: "#e8d44d",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        mixBlendMode: "difference",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", right: "3.5rem", top: "3rem",
        display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: "0.7rem", zIndex: 100,
      }}>
        {[
          { label: "About Me", id: "about-me" },
          { label: "Work", id: "project" },
          { label: "Skill", id: "tech-stack" },
          { label: "Contact", id: "contact" },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => smoothScrollTo(id)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#fff", fontSize: "1rem", fontFamily: "Arial, sans-serif",
              opacity: 0.75, letterSpacing: "0.05em",
              transition: "color 0.2s, opacity 0.2s", padding: 0,
            }}
            onMouseEnter={e => { e.target.style.color = "#e8d44d"; e.target.style.opacity = 1 }}
            onMouseLeave={e => { e.target.style.color = "#fff"; e.target.style.opacity = 0.75 }}
          >{label}</button>
        ))}
      </nav>

      {/* SMOOTH ROOT */}
      <div id="__smooth_root__">
        <div ref={heroRef} style={{ position: "relative", zIndex: 1, background: "#0d0d0d", willChange: "opacity" }}>
          <Hero setHovered={setHovered} />
        </div>
        <div style={{ position: "relative", zIndex: 1, background: "#0d0d0d" }}>
          <About setHovered={setHovered} />
        </div>
        <div style={{ position: "relative", zIndex: 1, background: "#0d0d0d" }}>
          <Projects setHovered={setHovered} />
        </div>
        <div style={{ position: "relative", zIndex: 1, background: "#0d0d0d" }}>
          <Skills setHovered={setHovered} />
        </div>
      </div>
    </>
  )
}