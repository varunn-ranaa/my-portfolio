import { useEffect, useRef, useState, useMemo } from "react"
import useScrollDim from "../hooks/useScrollDim"

function useInView(threshold = 0.1) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { setInView(entry.isIntersecting) },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

export default function Contact({ setHovered, currentYRef }) {
    const [sectionRef, inView] = useInView(0.1)
    const labelRef = useRef(null)
    const headerRef = useRef(null)
    const hlRef = useRef(null)
    const iconRefs = useRef([])

    const dimTargets = useMemo(() => {
        const targets = [
            { ref: labelRef, type: "yellow" },
            { ref: headerRef, type: "heading" },
            { ref: hlRef, type: "yellow" }
        ]
        iconRefs.current.forEach(iconRef => {
            if (iconRef) targets.push({ ref: { current: iconRef }, type: "yellow" })
        })
        return targets
    }, [])
    useScrollDim(dimTargets, currentYRef)


    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                background: "#0d0d0d",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                padding: "4rem 8rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Top divider */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "8rem",
                width: inView ? "calc(100% - 16rem)" : "0%",
                height: "1px",
                background: "linear-gradient(90deg, #e8d44d, #e8d44d33, transparent)",
                transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />

            {/* Faint BG text */}
            <div style={{
                position: "absolute",
                bottom: "-3rem", right: "-1rem",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 16vw, 14rem)",
                color: "#ffffff04",
                letterSpacing: "0.05em",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
                left : "50%"
            }}>
                CONNECT
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6rem",
                width: "100%",
                maxWidth: "960px",
                alignItems: "center",
            }}>

                {/* LEFT — Photo */}
                <div style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: "0.1s",
                }}>
                    <div style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "4/5",
                            maxWidth: "340px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid #1e1e1e",
                        }}>
                        <img
                            src="/me.jpeg"
                            alt="Varun Rana"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                        {/* Bottom gradient overlay */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, #0d0d0daa 0%, transparent 50%)",
                        }} />
                        {/* Yellow corner accent */}
                        <div style={{
                            position: "absolute",
                            top: 0, left: 0,
                            width: "40px", height: "3px",
                            background: "#e8d44d",
                        }} />
                        <div style={{
                            position: "absolute",
                            top: 0, left: 0,
                            width: "3px", height: "40px",
                            background: "#e8d44d",
                        }} />
                    </div>
                </div>

                {/* RIGHT — Info */}
                <div>
                    {/* Label */}
                    <div 
                        ref={labelRef}
                        style={{
                            fontSize: "2rem",
                            fontFamily: "'Bebas Neue', sans-serif",
                            letterSpacing: "0.3em",
                        color: "#e8d44d",
                        marginBottom: "1.5rem",
                        opacity: inView ? 1 : 0,
                        transition: "opacity 0.6s ease",
                        transitionDelay: "0.2s",
                    }}>
                        CONNECT
                    </div>

                    {/* Big heading */}
                    <h2
                        ref={headerRef}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(3rem, 6vw, 4.5rem)",
                            color: "#3a3a3a",
                            letterSpacing: "0.06em",
                            lineHeight: 1.05,
                            margin: "0 0 1rem 0",
                            cursor: "none",
                            userSelect: "none",
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                            transitionDelay: "0.25s",
                        }}
                    >
                        LET'S BUILD<br />
                        <span ref={hlRef} style={{ color: "#e8d44d" }}>SOMETHING</span>
                    </h2>

                    <p style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "0.88rem",
                        color: "#555",
                        lineHeight: 1.8,
                        marginBottom: "2.5rem",
                        maxWidth: "320px",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                        transitionDelay: "0.35s",
                    }}>
                        Open to collaborations, freelance work, and full-time opportunities.
                        Drop a message.
                    </p>

                    {/* Links */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                        transitionDelay: "0.45s",
                    }}>
                        {[
                            {
                                icon: (
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                ),
                                label: "varunrana1777@gmail.com",
                                href: "mailto:varunrana1777@gmail.com",
                            },
                            {
                                icon: (
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                ),
                                label: "github.com/varunn-ranaa",
                                href: "https://github.com/varunn-ranaa",
                            },
                            {
                                icon: (
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 .77 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
                                    </svg>
                                ),
                                label: "linkedin.com/in/varun-rana",
                                href: "https://in.linkedin.com/in/varun-rana-6a7560324",
                            },
                        ].map(({ icon, label, href }, index) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.8rem",
                                    color: "#444",
                                    textDecoration: "none",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "0.82rem",
                                    letterSpacing: "0.03em",
                                    padding: "0.6rem 0",
                                    borderBottom: "1px solid #1a1a1a",
                                    transition: "color 0.2s",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "#e8d44d"}
                                onMouseLeave={e => e.currentTarget.style.color = "#444"}
                            >
                                <span ref={el => iconRefs.current[index] = el} style={{ color: "#e8d44d", flexShrink: 0 }}>{icon}</span>
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Footer note */}
                    <div style={{
                        marginTop: "3rem",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.99rem",
                        letterSpacing: "0.2em",
                        color: "#222",
                        opacity: inView ? 1 : 0,
                        transition: "opacity 0.6s ease",
                        transitionDelay: "0.7s",
                    }}>
                       BUILT BY VARUN RANA · 2025
                    </div>
                </div>
            </div>
        </section>
    )
}