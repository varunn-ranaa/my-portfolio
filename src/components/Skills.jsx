import { useEffect, useRef, useState, useMemo } from "react"
import useScrollDim from "../hooks/useScrollDim"
import ParticleCanvas from "./ParticleCanvas"
// Namespace imports: pulls in every icon from each set as an object instead
// of naming each one individually. If a specific icon name doesn't exist in
// the installed version, ICONS["ThatName"] is just `undefined` -- it does
// NOT crash the build the way a missing named import does.
import * as SiIcons from "react-icons/si"
import * as FaIcons from "react-icons/fa"

// Merged lookup table across both icon sets (Simple Icons brand logos +
// Font Awesome as a fallback/generic set for things with no brand logo,
// like OAuth, or where a Si export name has changed between versions).
const ICONS = { ...SiIcons, ...FaIcons }

function getIcon(...candidateNames) {
    for (const n of candidateNames) {
        if (ICONS[n]) return ICONS[n]
    }
    return null
}

// Single source of truth: every skill, its category (matches the filter tabs),
// its icon (resolved safely via getIcon, checking multiple candidate names)
// and its brand/accent color.
const SKILLS = [
    { name: "HTML", category: "FRONTEND", icon: getIcon("SiHtml5", "FaHtml5"), color: "#e34f26" },
    { name: "CSS", category: "FRONTEND", icon: getIcon("SiCss3", "FaCss3", "FaCss3Alt"), color: "#1572b6" },
    { name: "JavaScript", category: "FRONTEND", icon: getIcon("SiJavascript", "FaJs"), color: "#f7df1e" },
    { name: "React", category: "FRONTEND", icon: getIcon("SiReact", "FaReact"), color: "#61dafb" },
    { name: "TypeScript", category: "FRONTEND", icon: getIcon("SiTypescript"), color: "#3178c6" },
    { name: "Next.js", category: "FRONTEND", icon: getIcon("SiNextdotjs"), color: "#ffffff" },

    { name: "Node.js", category: "BACKEND", icon: getIcon("SiNodedotjs", "FaNodeJs"), color: "#5fa04e" },
    { name: "Express", category: "BACKEND", icon: getIcon("SiExpress"), color: "#ffffff" },
    { name: "WebRTC", category: "BACKEND", icon: getIcon("SiWebrtc"), color: "#ff8300" },
    { name: "JWT", category: "BACKEND", icon: getIcon("SiJsonwebtokens", "FaKey"), color: "#d63aff" },
    { name: "OAuth 2.0", category: "BACKEND", icon: getIcon("FaKey", "FaLock", "FaUserLock"), color: "#e8d44d" },
    { name: "NextAuth.js", category: "BACKEND", icon: getIcon("FaShieldAlt", "FaUserShield", "FaShield"), color: "#844fba" },
    { name: "Appwrite", category: "BACKEND", icon: getIcon("SiAppwrite"), color: "#fd366e" },
    { name: "Supabase", category: "BACKEND", icon: getIcon("SiSupabase"), color: "#3ecf8e" },

    { name: "MongoDB", category: "DATABASE", icon: getIcon("SiMongodb", "FaDatabase"), color: "#47a248" },
    { name: "PostgreSQL", category: "DATABASE", icon: getIcon("SiPostgresql"), color: "#4169e1" },
    { name: "MySQL", category: "DATABASE", icon: getIcon("SiMysql"), color: "#4479a1" },
    { name: "Redis", category: "DATABASE", icon: getIcon("SiRedis"), color: "#dc382d" },

    { name: "Git", category: "DEVOPS/TOOLS", icon: getIcon("SiGit", "FaGitAlt"), color: "#f05032" },
    { name: "GitHub", category: "DEVOPS/TOOLS", icon: getIcon("SiGithub", "FaGithub"), color: "#ffffff" },
    { name: "VS Code", category: "DEVOPS/TOOLS", icon: getIcon("SiVisualstudiocode", "SiVsco", "SiVscodium"), color: "#007acc" },
    { name: "Postman", category: "DEVOPS/TOOLS", icon: getIcon("SiPostman"), color: "#ff6c37" },
    { name: "Docker", category: "DEVOPS/TOOLS", icon: getIcon("SiDocker", "FaDocker"), color: "#2496ed" },
    { name: "AWS", category: "DEVOPS/TOOLS", icon: getIcon("SiAmazonaws", "SiAmazonwebservices", "FaAws"), color: "#ff9900" },
]

const TABS = ["FRONTEND", "BACKEND", "DATABASE", "DEVOPS/TOOLS"]

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

function SkillCard({ skill, index, isMobile }) {
    const [hovered, setHovered] = useState(false)
    const Icon = skill.icon

    return (
        <div
            onMouseEnter={() => !isMobile && setHovered(true)}
            onMouseLeave={() => !isMobile && setHovered(false)}
            onClick={() => isMobile && setHovered(prev => !prev)}
            style={{
                position: "relative",
                background: "#111",
                border: hovered ? "1px solid #e8d44d66" : "1px solid #222",
                borderRadius: "14px",
                padding: isMobile ? "1.2rem 0.75rem" : "1.75rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.9rem",
                cursor: isMobile ? "pointer" : "default",
                boxShadow: hovered ? "0 0 24px rgba(232,212,77,0.15)" : "none",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, opacity 0.4s ease",
                opacity: 0,
                animation: `fadeInUp 0.5s ease ${index * 0.04}s forwards`,
            }}
        >
            {hovered && (
                <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#e8d44d",
                    boxShadow: "0 0 8px #e8d44d, 0 0 16px #e8d44d66",
                }} />
            )}

            <div style={{
                width: isMobile ? "48px" : "56px",
                height: isMobile ? "48px" : "56px",
                borderRadius: "12px",
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "1.4rem" : "1.7rem",
                transition: "border-color 0.3s ease",
                borderColor: hovered ? `${skill.color}55` : "#2a2a2a",
            }}>
                {Icon
                    ? <Icon color={skill.color} size={isMobile ? 24 : 28} />
                    : <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.75rem",
                        color: skill.color,
                        letterSpacing: "0.05em",
                    }}>{skill.name.slice(0, 2).toUpperCase()}</span>
                }
            </div>

            <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: isMobile ? "0.78rem" : "0.9rem",
                fontWeight: 600,
                color: hovered ? "#e8d44d" : "#ccc",
                letterSpacing: "0.01em",
                textAlign: "center",
                transition: "color 0.3s ease",
            }}>
                {skill.name}
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default function Skills({ setHovered, currentYRef }) {
    const [ref, inView] = useInView(0.1)
    const labelRef = useRef(null)
    const headerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState("FRONTEND")

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const dimTargets = useMemo(() => [
        { ref: labelRef, type: "yellow" },
        { ref: headerRef, type: "heading" },
    ], [])
    useScrollDim(dimTargets, currentYRef)

    const filteredSkills = SKILLS.filter(s => s.category === activeTab)

    return (
        <section
            id="skills"
            ref={ref}
            style={{
                background: "#0d0d0d",
                padding: isMobile ? "3rem 1.25rem" : "4rem 8rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <ParticleCanvas count={isMobile ? 25 : 60} />

            <div style={{
                width: inView ? "100%" : "0%",
                height: "1px",
                background: "linear-gradient(90deg, #e8d44d, transparent)",
                marginBottom: "4rem",
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            }} />

            <div ref={labelRef} style={{
                fontSize: isMobile ? "1.4rem" : "2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.3em",
                color: "#e8d44d",
                marginBottom: "1.5rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
                SKILLS
            </div>

            <h2
                ref={headerRef}
                onMouseEnter={() => !isMobile && setHovered && setHovered(true)}
                onMouseLeave={() => !isMobile && setHovered && setHovered(false)}
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(3rem, 6vw, 4.5rem)",
                    color: "#2e2e2e",
                    letterSpacing: "0.06em",
                    marginBottom: "2.5rem",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                    cursor: isMobile ? "default" : "none",
                    userSelect: "none",
                }}
            >
                WHAT I WORK WITH
            </h2>

            {/* Category tabs */}
            <div style={{
                display: "flex",
                gap: "0.6rem",
                marginBottom: "2.5rem",
                overflowX: "auto",
                paddingBottom: "0.4rem",
                scrollbarWidth: "none",
            }}>
                {TABS.map(tab => {
                    const active = activeTab === tab
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flexShrink: 0,
                                padding: isMobile ? "0.5rem 1rem" : "0.6rem 1.3rem",
                                borderRadius: "999px",
                                border: active ? "1px solid #e8d44d" : "1px solid #2a2a2a",
                                background: active ? "#e8d44d" : "#111",
                                color: active ? "#0d0d0d" : "#999",
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "0.1em",
                                fontSize: isMobile ? "0.75rem" : "0.85rem",
                                cursor: isMobile ? "default" : "pointer",
                                transition: "all 0.25s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </button>
                    )
                })}
            </div>

            {/* Skill cards */}
            <div
                key={activeTab}
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "repeat(2, 1fr)"
                        : "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: isMobile ? "0.9rem" : "1.25rem",
                    maxWidth: "1100px",
                }}
            >
                {filteredSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} isMobile={isMobile} />
                ))}
            </div>
        </section>
    )
}