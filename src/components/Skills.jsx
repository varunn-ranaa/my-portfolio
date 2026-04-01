import { useEffect, useRef, useState } from "react"

const skillGroups = [
    {
        category: "Frontend",
        items: ["React", "HTML", "CSS", "JavaScript"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "REST APIs", "MongoDB"],
    },
    {
        category: "AI / ML",
        items: ["Python", "scikit-learn", "NumPy", "Pandas"],
    },
    {
        category: "Tools",
        items: ["Git", "GitHub", "VS Code", "Postman"],
    },
]

function useInView(threshold = 0.1) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

function SkillPill({ name, delay, inView }) {
    const [hovered, setHov] = useState(false)

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 1.2rem",
                borderRadius: "999px",
                border: hovered ? "1px solid #e8d44d" : "1px solid #222",
                background: hovered ? "#e8d44d0f" : "#111",
                color: hovered ? "#e8d44d" : "#555",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "0.95rem",
                letterSpacing: "0.15em",
                cursor: "default",
                userSelect: "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: inView ? `${delay}s` : "0s",
                whiteSpace: "nowrap",
            }}
        >
            {/* dot */}
            <span style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: hovered ? "#e8d44d" : "#333",
                transition: "background 0.25s",
                flexShrink: 0,
            }} />
            {name}
        </div>
    )
}

export default function Skills({ setHovered }) {
    const [sectionRef, inView] = useInView(0.1)

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                background: "#0d0d0d",
                padding: "4rem 8rem 8rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Faint giant BG text
            <div style={{
                position: "absolute",
                bottom: "-2rem",
                right: "-2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(8rem, 18vw, 18rem)",
                color: "#ffffff04",
                letterSpacing: "0.05em",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
            }}>
                SKILLS
            </div> */}

            {/* Top divider line */}
            <div style={{
                width: inView ? "100%" : "0%",
                height: "1px",
                background: "linear-gradient(90deg, #e8d44d, #e8d44d22, transparent)",
                marginBottom: "4rem",
                transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0s",
            }} />

            {/* Section label */}
            <div style={{
                fontSize: "2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.3em",
                color: "#e8d44d",
                marginBottom: "1.5rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
                SKILLS
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
                    margin: "0 0 5rem 0",
                    lineHeight: 1,
                    cursor: "none",
                    userSelect: "none",
                    position: "relative",
                    zIndex: 9999,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: "0.15s",
                }}
            >
                WHAT I WORK WITH
            </h2>

            {/* Skill groups */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "3.5rem 4rem",
                maxWidth: "860px",
            }}>
                {skillGroups.map((group, gi) => (
                    <div key={group.category}>
                        {/* Category label */}
                        <div style={{
                            fontSize: "1rem",
                            fontFamily: "'Noto Sans Linear A', sans-serif",
                            letterSpacing: "0.25em",
                            color: "#e8d44d",
                            marginBottom: "1.2rem",
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(15px)",
                            transition: "opacity 0.6s ease, transform 0.6s ease",
                            transitionDelay: `${0.2 + gi * 0.1}s`,
                        }}>
                            {group.category}
                        </div>

                        {/* Horizontal rule under category */}
                        <div style={{
                            width: inView ? "40px" : "0px",
                            height: "1px",
                            background: "#e8d44d44",
                            marginBottom: "1rem",
                            transition: "width 0.6s ease",
                            transitionDelay: `${0.25 + gi * 0.1}s`,
                        }} />

                        {/* Pills */}
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                        }}>
                            {group.items.map((skill, si) => (
                                <SkillPill
                                    key={skill}
                                    name={skill}
                                    inView={inView}
                                    delay={0.3 + gi * 0.1 + si * 0.06}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom counter line */}
            <div style={{
                marginTop: "5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s ease",
                transitionDelay: "0.8s",
            }}>
                <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2.5rem",
                    color: "#e8d44d",
                    letterSpacing: "0.05em",
                }}>
                    {skillGroups.reduce((acc, g) => acc + g.items.length, 0)}+
                </span>
                <span style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "0.8rem",
                    color: "#333",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                }}>
                    Technologies &amp; Tools
                </span>
                <div style={{
                    flex: 1,
                    height: "1px",
                    background: "linear-gradient(90deg, #222, transparent)",
                }} />
            </div>
        </section>
    )
}