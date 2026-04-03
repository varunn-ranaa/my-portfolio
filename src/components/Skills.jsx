import { useEffect, useRef, useState } from "react"

const skillGroups = [
    { category: "Frontend", items: ["React", "HTML", "CSS", "JavaScript"] },
    { category: "Backend", items: ["Node.js", "Express", "REST APIs", "MongoDB","PostgreSQl", "WebRTC"] },
    { category: "AI / ML", items: ["Python", "scikit-learn", "NumPy", "Pandas"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "Postman","Docker"] },
]

function useInView(threshold = 0.1) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

function SkillPill({ name, delay, inView }) {
    const outerRef = useRef(null)
    const [dims, setDims] = useState({ w: 0, h: 0 })
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if (!outerRef.current) return
        // Small timeout so browser paints opacity/transform first, then we measure
        const id = setTimeout(() => {
            const el = outerRef.current
            if (!el) return
            setDims({ w: el.offsetWidth, h: el.offsetHeight })
        }, 50)
        const ro = new ResizeObserver(() => {
            const el = outerRef.current
            if (!el) return
            setDims({ w: el.offsetWidth, h: el.offsetHeight })
        })
        ro.observe(outerRef.current)
        return () => { clearTimeout(id); ro.disconnect() }
    }, [inView])

    const { w, h } = dims
    const r = h / 2

    // Clean pill path
    const pillPath = w > 0 && h > 0
        ? `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`
        : ""

    // Safe CSS id (no spaces/slashes)
    const gradId = `trail-${name.replace(/[^a-z0-9]/gi, "")}`

    return (
        <div
            ref={outerRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.55rem 1.2rem",
                borderRadius: "999px",
                background: hovered ? "rgba(232,212,77,0.10)" : "rgba(255,255,255,0.03)",
                border: hovered ? "1px solid rgba(232,212,77,0.45)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: hovered
                    ? "0 0 18px rgba(232,212,77,0.20), inset 0 0 8px rgba(232,212,77,0.10)"
                    : "none",
                color: hovered ? "#e8d44d" : "#aaa",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.10em",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                cursor: "default",
                // Separate transitions so delay only applies to entry animation
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(18px)",
                transition: `
                    opacity 0.5s ease ${delay}s,
                    transform 0.5s ease ${delay}s,
                    background 0.3s ease,
                    border 0.3s ease,
                    box-shadow 0.3s ease,
                    color 0.3s ease
                `,
            }}
        >
            {/* SVG animated border — rendered only after dims are measured */}
            {pillPath && (
                <svg
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: `${w}px`,
                        height: `${h}px`,
                        pointerEvents: "none",
                        overflow: "visible",
                    }}
                    viewBox={`0 0 ${w} ${h}`}
                >
                    <defs>
                        <linearGradient id={gradId} gradientUnits="userSpaceOnUse"
                            x1="0" y1="0" x2={w} y2="0">
                            <stop offset="0%"   stopColor="#e8d44d" stopOpacity="1" />
                            <stop offset="55%"  stopColor="#e8d44d" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#e8d44d" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Static base border */}
                    <path d={pillPath} fill="none" stroke="#1f1f1f" strokeWidth="1" />

                    {/* Orbiting gradient trail */}
                    <path
                        d={pillPath}
                        fill="none"
                        stroke={`url(#${gradId})`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        pathLength="100"
                        strokeDasharray={hovered ? "100 0" : "35 65"}
                        style={{
                            filter: hovered ? "drop-shadow(0 0 5px #e8d44d)" : "none",
                            animation: "orbitTrail 2.5s linear infinite",
                            transition: "stroke-dasharray 0.4s ease, filter 0.3s ease",
                        }}
                    />
                </svg>
            )}

            {/* Dot indicator */}
            <span style={{
                flexShrink: 0,
                width:  hovered ? "7px" : "5px",
                height: hovered ? "7px" : "5px",
                borderRadius: "50%",
                background: hovered ? "#e8d44d" : "#555",
                boxShadow: hovered ? "0 0 8px #e8d44d, 0 0 16px #e8d44d66" : "none",
                transition: "all 0.3s ease",
            }} />

            {name}

            <style>{`
                @keyframes orbitTrail {
                    from { stroke-dashoffset: 0; }
                    to   { stroke-dashoffset: -100; }
                }
            `}</style>
        </div>
    )
}

function SkillGroup({ group, gi, inView }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{
                fontSize: "1.2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.28em",
                color: "#e8d44d",
                marginBottom: "1rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.6s ease ${0.15 + gi * 0.08}s, transform 0.6s ease ${0.15 + gi * 0.08}s`,
            }}>
                {group.category}
            </div>

            <div style={{
                width: hovered ? "80px" : "32px",
                height: "1px",
                background: hovered ? "#e8d44d" : "#e8d44d33",
                marginBottom: "1rem",
                transition: "width 0.35s ease, background 0.35s ease",
            }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {group.items.map((skill, si) => (
                    <SkillPill
                        key={skill}
                        name={skill}
                        inView={inView}
                        delay={0.25 + gi * 0.08 + si * 0.06}
                    />
                ))}
            </div>
        </div>
    )
}

export default function Skills({ setHovered }) {
    const [ref, inView] = useInView(0.1)

    return (
        <section
            id="skills"
            ref={ref}
            style={{
                background: "#0d0d0d",
                padding: "5rem 8rem",
            }}
        >
            <div style={{
                width: inView ? "100%" : "0%",
                height: "1px",
                background: "linear-gradient(90deg, #e8d44d, transparent)",
                marginBottom: "4rem",
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            }} />

            <div style={{
                fontSize: "2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.3em",
                color: "#e8d44d",
                marginBottom: "1.5rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
                SKILLS
            </div>

            <h2
                onMouseEnter={() => setHovered && setHovered(true)}
                onMouseLeave={() => setHovered && setHovered(false)}
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(3rem, 6vw, 4.5rem)",
                    color: "#2e2e2e",
                    letterSpacing: "0.06em",
                    marginBottom: "4rem",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                    cursor: "none",
                    userSelect: "none",
                }}
            >
                WHAT I WORK WITH
            </h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "3rem",
                maxWidth: "900px",
            }}>
                {skillGroups.map((group, gi) => (
                    <SkillGroup
                        key={group.category}
                        group={group}
                        gi={gi}
                        inView={inView}
                    />
                ))}
            </div>
        </section>
    )
}