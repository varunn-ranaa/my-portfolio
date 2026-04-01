import { useState, useEffect, useRef } from "react"
import Hero from "./components/me.jsx"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import NavBar from "./components/NavBar"

function useSmoothScroll(currentYRef) {
  useEffect(() => {
    let targetY = 0, rafId = null, isScrolling = false
    const LERP = 0.09

    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    const scroller = document.getElementById("__smooth_root__")

    Object.defineProperty(window, "scrollY", {
      get: () => currentYRef.current,
      configurable: true,
    })

    function getMaxScroll() {
      return Math.max(0, (scroller?.scrollHeight || 0) - window.innerHeight)
    }
    function tick() {
      if (window.__smoothNavTarget__ !== undefined) {
        targetY = Math.max(0, Math.min(getMaxScroll(), window.__smoothNavTarget__))
        window.__smoothNavTarget__ = undefined
      }
      const diff = targetY - currentYRef.current
      if (Math.abs(diff) < 0.05) {
        currentYRef.current = targetY
        if (scroller) scroller.style.transform = `translateY(${-currentYRef.current}px)`
        isScrolling = false; rafId = null; return
      }
      currentYRef.current += diff * LERP
      if (scroller) scroller.style.transform = `translateY(${-currentYRef.current}px)`
      rafId = requestAnimationFrame(tick)
    }
    function startTick() {
      if (!isScrolling) { isScrolling = true; rafId = requestAnimationFrame(tick) }
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

export default function App() {
  const [hovered, setHovered] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const ballDomRef = useRef(null)
  const currentYRef = useRef(0)

  const heroWrap    = useRef(null)
  const aboutWrap   = useRef(null)
  const projectWrap = useRef(null)
  const skillsWrap  = useRef(null)

  const heroOpCur    = useRef(1)
  const aboutOpCur   = useRef(1)
  const projectOpCur = useRef(1)

  useSmoothScroll(currentYRef)

  useEffect(() => {
    const kick = () => window.dispatchEvent(new WheelEvent("wheel", { deltaY: 0, bubbles: true }))
    window.addEventListener("__smooth_kick__", kick)
    return () => window.removeEventListener("__smooth_kick__", kick)
  }, [])

  useEffect(() => {
    let mouseX = -100, mouseY = -100
    let ballX = -100, ballY = -100
    let animId

    const ease = (t) => t * t * (3 - 2 * t)
    const handleMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }

    // Exact same logic as hero→about:
    // scrollY approaches el.offsetTop → that section is about to leave → fade it out
    // fade zone: last 40% of the section's height
    const calcOp = (el) => {
      if (!el) return 1
      const s      = currentYRef.current
      const top    = el.offsetTop
      const h      = el.offsetHeight
      // fadeStart: 60% into section, fadeEnd: section fully scrolled past
      const fadeStart = top + h * 0.55
      const fadeEnd   = top + h * 1.0
      const p = Math.min(Math.max((s - fadeStart) / (fadeEnd - fadeStart), 0), 1)
      return 1 - ease(p)
    }

    const animate = () => {
      ballX += (mouseX - ballX) * 0.08
      ballY += (mouseY - ballY) * 0.08
      if (ballDomRef.current) {
        ballDomRef.current.style.left = ballX + "px"
        ballDomRef.current.style.top  = ballY + "px"
      }

      const heroTarget    = calcOp(heroWrap.current)
      const aboutTarget   = calcOp(aboutWrap.current)
      const projectTarget = calcOp(projectWrap.current)

      heroOpCur.current    += (heroTarget    - heroOpCur.current)    * 0.07
      aboutOpCur.current   += (aboutTarget   - aboutOpCur.current)   * 0.07
      projectOpCur.current += (projectTarget - projectOpCur.current) * 0.07

      if (heroWrap.current)    heroWrap.current.style.opacity    = heroOpCur.current
      if (aboutWrap.current)   aboutWrap.current.style.opacity   = aboutOpCur.current
      if (projectWrap.current) projectWrap.current.style.opacity = projectOpCur.current

      // Active section detection — check all sections including contact
      const sy = currentYRef.current
      const vh = window.innerHeight
      const contactEl = document.getElementById("contact")
      const sections = [
        { id: "hero",     el: heroWrap.current    },
        { id: "about-me", el: aboutWrap.current   },
        { id: "work",     el: projectWrap.current },
        { id: "skills",   el: skillsWrap.current  },
        { id: "contact",  el: contactEl           },
      ]
      let current = "hero"
      for (const { id, el } of sections) {
        if (el && sy >= el.offsetTop - vh * 0.4) current = id
      }
      window.__currentSection__ = current

      window.__navOffsets__ = {
        about:   aboutWrap.current?.offsetTop   ?? window.innerHeight,
        work:    projectWrap.current?.offsetTop ?? window.innerHeight * 2,
        skills:  skillsWrap.current?.offsetTop  ?? window.innerHeight * 3,
        contact: document.getElementById("contact")?.offsetTop ?? window.innerHeight * 4,
      }

      animId = requestAnimationFrame(animate)
    }

    // Sync active section to React state every 200ms (no need for every frame)
    const syncInterval = setInterval(() => {
      if (window.__currentSection__) setActiveSection(window.__currentSection__)
    }, 150)

    window.addEventListener("mousemove", handleMove)
    animId = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(animId)
      clearInterval(syncInterval)
    }
  }, [])

  const navScrollTo = (id) => {
    const o = window.__navOffsets__ || {}
    const map = {
      "about-me": o.about   ?? window.innerHeight,
      "work":     o.work    ?? window.innerHeight * 2,
      "skills":   o.skills  ?? window.innerHeight * 3,
      "contact":  o.contact ?? window.innerHeight * 4,
    }
    window.__smoothNavTarget__ = map[id] ?? 0
    window.dispatchEvent(new Event("__smooth_kick__"))
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0d0d0d; overflow: hidden; height: 100%; scrollbar-width: none; }
        ::-webkit-scrollbar { display: none; }
        #__smooth_root__ {
          will-change: transform;
          position: fixed;
          top: 0; left: 0;
          width: 100%;
        }
      `}</style>

      <div ref={ballDomRef} style={{
        position: "fixed", left: "-100px", top: "-100px",
        width: hovered ? "18rem" : "14px",
        height: hovered ? "18rem" : "14px",
        borderRadius: "50%", background: "#e8d44d",
        transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 9999,
        transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        mixBlendMode: "difference",
      }} />

      <NavBar activeSection={activeSection} navScrollTo={navScrollTo} />

      <div id="__smooth_root__">
        <div ref={heroWrap} style={{ position: "relative", background: "#0d0d0d", willChange: "opacity" }}>
          <Hero setHovered={setHovered} />
        </div>
        <div ref={aboutWrap} style={{ position: "relative", background: "#0d0d0d", willChange: "opacity" }}>
          <About setHovered={setHovered} />
        </div>
        <div ref={projectWrap} style={{ position: "relative", background: "#0d0d0d", willChange: "opacity" }}>
          <Projects setHovered={setHovered} />
        </div>
        <div ref={skillsWrap} style={{ position: "relative", background: "#0d0d0d" }}>
          <Skills setHovered={setHovered} />
        </div>
        <div id="contact" style={{ position: "relative", background: "#0d0d0d" }}>
          <Contact setHovered={setHovered} />
        </div>
      </div>
    </>
  )
}