import { useEffect, useRef, useState, useMemo } from "react"
import useScrollDim from "../hooks/useScrollDim"

const projects = [
    {
        number: "01",
        title: "Project Alpha",
        tag: "Full Stack",
        year: "2024",
        description:
            "A full-stack web application built with the MERN stack. Features real-time updates, JWT auth, and a clean dashboard UI.",
        tech: ["MongoDB", "Express", "React", "Node.js"],
        github: "https://github.com/varunn-ranaa",
        live: "#",
        accent: "#e8d44d",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    },
    {
        number: "02",
        title: "Project Beta",
        tag: "AI / ML",
        year: "2024",
        description:
            "An ML-powered tool that classifies and processes data using a trained model. Built with Python, Flask, and a React frontend.",
        tech: ["Python", "Flask", "React", "scikit-learn"],
        github: "https://github.com/varunn-ranaa",
        live: "#",
        accent: "#ffffff",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
    },
    {
        number: "03",
        title: "Project Gamma",
        tag: "Frontend",
        year: "2025",
        description:
            "A pixel-perfect, animated landing page with smooth scroll, custom cursor, and responsive design. Built for performance.",
        tech: ["React", "CSS", "Framer Motion"],
        github: "https://github.com/varunn-ranaa",
        live: "#",
        accent: "#e8d44d",
        image: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=900&q=80",
    },
]

const CARD_SCROLL_DISTANCE = 600
const NAVBAR_HEIGHT = 80

// ─── Shared card UI ──────────────────────────────────────────────────────────
function CardInner({ project, hov, setHov, setHovered }) {
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: "480px",
                background: "#0f0f0f",
                border: hov ? `1px solid ${project.accent}99` : "1px solid #1a1a1a",
                borderRadius: "0px",
                overflow: "hidden",
                cursor: "auto",
                boxShadow: hov
                    ? `0 0 0 1px ${project.accent}22, 0 -24px 80px rgba(0,0,0,0.7)`
                    : "0 -12px 50px rgba(0,0,0,0.6)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                transformOrigin: "top center",
                willChange: "transform, filter",
            }}
        >
            {/* LEFT */}
            <div style={{
                padding: "3.5rem 3.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: `1px solid ${hov ? project.accent + "33" : "#1a1a1a"}`,
                transition: "border-color 0.35s ease",
                background: "#0d0d0d",
            }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                        <span style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "4rem", color: "#1f1f1f",
                            lineHeight: 1, letterSpacing: "0.04em", userSelect: "none",
                        }}>{project.number}</span>
                        <span style={{
                            fontSize: "0.6rem", fontFamily: "Arial, sans-serif",
                            color: project.accent, border: `1px solid ${project.accent}44`,
                            borderRadius: "3px", padding: "3px 10px", letterSpacing: "0.22em",
                            background: `${project.accent}0d`, textTransform: "uppercase",
                        }}>{project.tag}</span>
                    </div>

                    <h3
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(3.2rem, 4.5vw, 5rem)",
                            color: "#e2e2e2", letterSpacing: "0.06em",
                            margin: "0 0 1.4rem 0", lineHeight: 1, transition: "color 0.3s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = project.accent}
                        onMouseLeave={e => e.currentTarget.style.color = "#e2e2e2"}
                    >
                        {project.title}
                    </h3>

                    <p style={{
                        fontSize: "0.85rem", fontFamily: "Arial, sans-serif",
                        color: "#555", lineHeight: 1.85, margin: 0,
                    }}>{project.description}</p>
                </div>

                <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.8rem", marginTop: "2rem" }}>
                        {project.tech.map(t => (
                            <span key={t} style={{
                                fontSize: "0.62rem", fontFamily: "Arial, sans-serif",
                                color: "#444", border: "1px solid #222", borderRadius: "3px",
                                padding: "3px 10px", letterSpacing: "0.12em", textTransform: "uppercase",
                            }}>{t}</span>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "0.8rem" }}>
                        <a href={project.github} target="_blank" rel="noreferrer"
                            style={{
                                display: "flex", alignItems: "center", gap: "0.45rem",
                                fontSize: "0.72rem", fontFamily: "Arial, sans-serif",
                                color: "#444", textDecoration: "none", letterSpacing: "0.1em",
                                border: "1px solid #222", borderRadius: "4px", padding: "7px 16px",
                                transition: "color 0.2s, border-color 0.2s",
                            }}
                            onMouseOver={e => { e.currentTarget.style.color = "#e8d44d"; e.currentTarget.style.borderColor = "#e8d44d44" }}
                            onMouseOut={e => { e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "#222" }}
                        >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a href={project.live} target="_blank" rel="noreferrer"
                            style={{
                                display: "flex", alignItems: "center", gap: "0.45rem",
                                fontSize: "0.72rem", fontFamily: "Arial, sans-serif",
                                color: "#e8d44d", textDecoration: "none", letterSpacing: "0.1em",
                                border: "1px solid #e8d44d33", borderRadius: "4px", padding: "7px 16px",
                                background: "#e8d44d0d", transition: "opacity 0.2s",
                            }}
                            onMouseOver={e => e.currentTarget.style.opacity = "0.65"}
                            onMouseOut={e => e.currentTarget.style.opacity = "1"}
                        >
                            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Live
                        </a>
                    </div>
                </div>
            </div>

            {/* RIGHT — Image */}
            <div style={{ position: "relative", overflow: "hidden", background: "#080808" }}>
                <span style={{
                    position: "absolute", top: "1.4rem", right: "1.6rem",
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem",
                    color: "#2a2a2a", letterSpacing: "0.2em", zIndex: 2,
                }}>{project.year}</span>
                <img src={project.image} alt={project.title} style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    opacity: hov ? 0.85 : 0.5,
                    filter: hov ? "grayscale(0%)" : "grayscale(25%)",
                    transform: hov ? "scale(1.04)" : "scale(1)",
                    transition: "opacity 0.55s ease, filter 0.55s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(13,13,13,0.5) 0%, transparent 60%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                    background: `linear-gradient(90deg, ${project.accent}, ${project.accent}00)`,
                    opacity: hov ? 1 : 0, transition: "opacity 0.4s ease",
                }} />
            </div>
        </div>
    )
}

// ─── Stacking card — same component for ALL cards, isLast skips dim/scale ───
function StackingCard({ project, index, isLast = false, setHovered, sectionRef }) {
    const trackerRef = useRef(null)
    const containerRef = useRef(null)
    const [hov, setHov] = useState(false)

    useEffect(() => {
        const tracker = trackerRef.current
        const container = containerRef.current
        if (!tracker || !container) return
        const card = container.firstElementChild

        const update = () => {
            const trackerRect = tracker.getBoundingClientRect()
            const sectionRect = sectionRef?.current?.getBoundingClientRect()

            let translateY = 0
            if (trackerRect.top <= NAVBAR_HEIGHT) {
                translateY = NAVBAR_HEIGHT - trackerRect.top
                if (sectionRect) {
                    const maxY = sectionRect.bottom - trackerRect.top - container.offsetHeight - 20
                    translateY = Math.min(translateY, Math.max(0, maxY))
                }
            }
            container.style.transform = `translateY(${translateY}px)`

            if (card) {
                if (isLast) {
                    // Last card — never dim, never scale down, always bright
                    card.style.transform = "scale(1)"
                    card.style.filter = "brightness(1)"
                } else {
                    const scrolled = NAVBAR_HEIGHT - trackerRect.top
                    const dimStart = CARD_SCROLL_DISTANCE
                    const dimEnd = CARD_SCROLL_DISTANCE + CARD_SCROLL_DISTANCE * 0.45
                    const progress = Math.min(1, Math.max(0,
                        (scrolled - dimStart) / (dimEnd - dimStart)
                    ))
                    card.style.transform = `scale(${Math.max(0.88, 1 - 0.05 * progress)})`
                    card.style.filter = `brightness(${Math.max(0.35, 1 - 0.5 * progress)})`
                }
            }
        }

        let raf
        const loop = () => { update(); raf = requestAnimationFrame(loop) }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <>
            <div ref={trackerRef} style={{ height: 0, margin: 0, padding: 0 }} />
            <div ref={containerRef} style={{ position: "relative", zIndex: 10 + index, willChange: "transform" }}>
                <CardInner project={project} hov={hov} setHov={setHov} setHovered={setHovered} />
            </div>
            <div style={{ height: `${CARD_SCROLL_DISTANCE}px` }} />
        </>
    )
}

// ─── Projects Section ────────────────────────────────────────────────────────
export default function Projects({ setHovered, currentYRef }) {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)
    const labelRef = useRef(null)
    const [inView, setInView] = useState(false)
    const inViewRef = useRef(false)

    const dimTargets = useMemo(() => [
        { ref: labelRef, type: "yellow" },
        { ref: headerRef, type: "heading" },
    ], [])
    useScrollDim(dimTargets, currentYRef)

    useEffect(() => {
        let animId
        const checkView = () => {
            if (!headerRef.current) return
            const rect = headerRef.current.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight * 0.9
            if (isVisible !== inViewRef.current) {
                inViewRef.current = isVisible
                setInView(isVisible)
            }
            animId = requestAnimationFrame(checkView)
        }
        animId = requestAnimationFrame(checkView)
        return () => cancelAnimationFrame(animId)
    }, [])

    return (
        <section
            id="work"
            ref={sectionRef}
            style={{ background: "#0d0d0d", padding: "4rem 2rem", position: "relative" }}
        >
            {/* Top divider */}
            <div style={{
                width: inView ? "calc(100% - 6rem)" : "0%",
                marginLeft: "6rem", height: "1px",
                background: "linear-gradient(90deg, #e8d44d, #e8d44d33, transparent)",
                marginBottom: "3rem",
                transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />

            {/* Section label */}
            <div ref={labelRef} style={{
                fontSize: "2rem", fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.3em", color: "#e8d44d",
                marginBottom: "1rem", marginLeft: "6rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}>WORK</div>

            {/* Heading */}
            <h2
                ref={headerRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3rem, 6vw, 4.5rem)",
                    color: "#3a3a3a", letterSpacing: "0.08em",
                    margin: "0 0 8rem 6rem", lineHeight: 1,
                    cursor: "auto", userSelect: "none",
                    position: "relative", zIndex: 9999,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: "0.2s",
                }}
            >SELECTED PROJECTS</h2>

            {/* All cards — same component, last one gets isLast=true */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                {projects.map((project, i) => (
                    <StackingCard
                        key={project.number}
                        project={project}
                        index={i}
                        isLast={i === projects.length - 1}
                        setHovered={setHovered}
                        sectionRef={sectionRef}
                    />
                ))}
            </div>

            <div style={{ height: "40px" }} />
        </section>
    )
}