import { useEffect, useRef, useState } from "react"

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
    },
]

function ProjectCard({ project, index, setHovered }) {
    const cardRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        const onScroll = () => {
            const rect = card.getBoundingClientRect()
            const vh = window.innerHeight
            // how far card has scrolled past top
            const p = Math.max(0, Math.min(1, (vh - rect.top) / vh))
            setProgress(p)
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        // also listen to our custom smooth scroll
        const raf = requestAnimationFrame(function loop() {
            onScroll()
            requestAnimationFrame(loop)
        })
        return () => {
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(raf)
        }
    }, [])

    // Scale down slightly as next card overlaps
    const scale = 1 - Math.max(0, progress - 0.7) * 0.08
    const opacity = 1 - Math.max(0, progress - 0.85) * 3

    return (
        <div
            ref={cardRef}
            style={{
                position: "sticky",
                top: `${80 + index * 24}px`,
                zIndex: 10 + index,
                marginBottom: "2px",
            }}
        >
            <div
                onMouseEnter={() => setHovered(false)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    transform: `scale(${scale})`,
                    opacity: Math.max(0.2, opacity),
                    transformOrigin: "top center",
                    transition: "transform 0.05s linear",
                    background: "#0f0f0f",
                    border: "1px solid #1e1e1e",
                    borderTop: `2px solid ${project.accent}`,
                    borderRadius: "16px",
                    padding: "2.5rem 2.8rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    maxWidth: "860px",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                    backdropFilter: "blur(2px)",
                    cursor: "none",
                }}
            >
                {/* LEFT */}
                <div>
                    {/* number + tag row */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.4rem",
                    }}>
                        <span style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "3.5rem",
                            color: "#1e1e1e",
                            lineHeight: 1,
                            letterSpacing: "0.05em",
                            userSelect: "none",
                        }}>{project.number}</span>
                        <span style={{
                            fontSize: "0.65rem",
                            fontFamily: "Arial, sans-serif",
                            color: project.accent,
                            border: `1px solid ${project.accent}44`,
                            borderRadius: "4px",
                            padding: "2px 8px",
                            letterSpacing: "0.2em",
                            background: `${project.accent}0d`,
                        }}>{project.tag}</span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        color: "#e8e8e8",
                        letterSpacing: "0.06em",
                        margin: 0,
                        lineHeight: 1,
                    }}>{project.title}</h3>

                    {/* Description */}
                    <p style={{
                        marginTop: "1.2rem",
                        fontSize: "0.88rem",
                        fontFamily: "Arial, sans-serif",
                        color: "#666",
                        lineHeight: 1.8,
                        maxWidth: "340px",
                    }}>{project.description}</p>
                </div>

                {/* RIGHT */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                    {/* Year */}
                    <div style={{
                        textAlign: "right",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "0.65rem",
                        color: "#333",
                        letterSpacing: "0.2em",
                    }}>{project.year}</div>

                    {/* Tech pills */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "auto",
                        paddingTop: "1rem",
                    }}>
                        {project.tech.map(t => (
                            <span key={t} style={{
                                fontSize: "0.7rem",
                                fontFamily: "Arial, sans-serif",
                                color: "#555",
                                border: "1px solid #222",
                                borderRadius: "999px",
                                padding: "3px 12px",
                                letterSpacing: "0.05em",
                                background: "#111",
                            }}>{t}</span>
                        ))}
                    </div>

                    {/* Links */}
                    <div style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1.8rem",
                    }}>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontSize: "0.75rem",
                                fontFamily: "Arial, sans-serif",
                                color: "#555",
                                textDecoration: "none",
                                letterSpacing: "0.08em",
                                transition: "color 0.2s",
                                border: "1px solid #1e1e1e",
                                borderRadius: "6px",
                                padding: "6px 14px",
                            }}
                            onMouseOver={e => e.currentTarget.style.color = "#e8d44d"}
                            onMouseOut={e => e.currentTarget.style.color = "#555"}
                        >
                            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontSize: "0.75rem",
                                fontFamily: "Arial, sans-serif",
                                color: "#e8d44d",
                                textDecoration: "none",
                                letterSpacing: "0.08em",
                                transition: "opacity 0.2s",
                                border: "1px solid #e8d44d33",
                                borderRadius: "6px",
                                padding: "6px 14px",
                                background: "#e8d44d0d",
                            }}
                            onMouseOver={e => e.currentTarget.style.opacity = "0.7"}
                            onMouseOut={e => e.currentTarget.style.opacity = "1"}
                        >
                            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Live
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Projects({ setHovered }) {
    const sectionRef = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold: 0.05 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="work"
            ref={sectionRef}
            style={{
                background: "#0d0d0d",
                padding: "6rem 8rem 12rem",
                position: "relative",
            }}
        >
            {/* Section label */}
            <div style={{
                fontSize: "2rem",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "0.3em",
                color: "#e8d44d",
                marginBottom: "1rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
                WORK
            </div>

            {/* Heading */}
            <h2
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    color: "#3a3a3a",
                    letterSpacing: "0.08em",
                    margin: "0 0 4rem 0",
                    lineHeight: 1,
                    cursor: "none",
                    userSelect: "none",
                    position: "relative",
                    zIndex: 9999,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: "0.2s",
                }}
            >
                SELECTED PROJECTS
            </h2>

            {/* Cards — sticky overlap stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {projects.map((project, i) => (
                    <ProjectCard key={project.number} project={project} index={i} setHovered={setHovered} />
                ))}
            </div>
        </section>
    )
}