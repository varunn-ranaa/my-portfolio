import { useEffect, useRef, useState, useMemo } from "react"
import useScrollDim from "../hooks/useScrollDim"
import ParticleCanvas from "./ParticleCanvas"

function useInView(threshold = 0.2) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
            },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [ref, inView]
}

export default function About({ setHovered, currentYRef }) {
    const [sectionRef, inView] = useInView(0.1)
    const labelRef = useRef(null)
    const headerRef = useRef(null)
    const hl1Ref = useRef(null)
    const hl2Ref = useRef(null)
    const eduLabelRef = useRef(null)
    const gradYearRef = useRef(null)

    const dimTargets = useMemo(() => [
        { ref: labelRef, type: "yellow" },
        { ref: headerRef, type: "brightText" },
        { ref: hl1Ref, type: "yellow" },
        { ref: hl2Ref, type: "yellow" },
        { ref: eduLabelRef, type: "yellow" },
        { ref: gradYearRef, type: "yellow" },
    ], [])
    useScrollDim(dimTargets, currentYRef)

    return (
        <section
            id="about-me"
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
            {/* Top divider line — before ABOUT ME */}
            <div style={{
                position: "absolute",
                top: "2rem",
                left: "8rem",
                right: "8rem",
                width: inView ? "calc(100% - 16rem)" : "0%",
                height: "1px",
                background: "linear-gradient(90deg, #e8d44d, #e8d44d22, transparent)",
                transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0s",
            }} />

            <ParticleCanvas count={70} />

            {/* ABOUT ME label */}
            <div 
                ref={labelRef}
                style={{
                    position: "absolute",
                    top: "6rem",
                    left: "8rem",
                    fontSize: "2rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.3em",
                color: "#e8d44d",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "0.3s",
            }}>
                ABOUT ME
            </div>

            <div style={{ maxWidth: "900px", width: "100%" }}>

                {/* Big text */}
                <p
                    ref={headerRef}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        paddingTop :"6rem",
                        fontSize: "clamp(2rem, 4.5vw, 4rem)",
                        fontFamily: "'Arial', sans-serif",
                        fontWeight: 300,
                        color: "#5f5f5f",
                        lineHeight: 1.4,
                        letterSpacing: "0.03em",
                        cursor: "none",
                        userSelect: "none",
                        margin: 0,
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0px)" : "translateY(60px)",
                        transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: "0.2s",
                    }}
                >
                    Hi there! I'm a{" "}
                    <span ref={hl1Ref} style={{ color: "#e8d44d" }}>Full Stack Developer</span>
                    {" "}based in{" "}
                    <span ref={hl2Ref} style={{ color: "#e8d44d" }}>Dehradun, India.</span>
                </p>

                {/* Bio text */}
                <p style={{
                    marginTop: "2rem",
                    fontSize: "1rem",
                    fontFamily: "'Arial', sans-serif",
                    fontWeight: 400,
                    color: "#888",
                    lineHeight: 1.8,
                    maxWidth: "600px",
                    letterSpacing: "0.02em",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0px)" : "translateY(40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: "0.45s",
                }}>
                   Full-Stack Developer dedicated to building robust, scalable ecosystems with the MERN stack.
                    I am currently bridging the gap between web development and Machine Learning to create smarter,
                     more efficient digital products.
                </p>

                {/* Education Card */}
                <div style={{
                    marginTop: "3.5rem",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0px)" : "translateY(40px)",
                    transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: "0.65s",
                }}>
                    <div 
                        ref={eduLabelRef}
                        style={{
                            fontSize: "1rem",
                            fontFamily: "'Roboto', sans-serif",
                            letterSpacing: "0.3em",
                            color: "#e8d44d",
                            marginBottom: "1rem",
                        }}
                    >
                        EDUCATION
                    </div>

                    <div
                        onMouseEnter={() => setHovered(false)}
                        style={{
                            position: "relative",
                            background: "#111",
                            border: "1px solid #222",
                            borderLeft: "3px solid #e8d44d",
                            borderRadius: "12px",
                            padding: "1.4rem 1.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1.4rem",
                            maxWidth: "640px",
                            cursor: "default",
                            transition: "border-color 0.3s, background 0.3s",
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = "#141414"
                            e.currentTarget.style.borderColor = "#e8d44d"
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = "#111"
                            e.currentTarget.style.borderLeftColor = "#e8d44d"
                            e.currentTarget.style.borderTopColor = "#222"
                            e.currentTarget.style.borderRightColor = "#222"
                            e.currentTarget.style.borderBottomColor = "#222"
                        }}
                    >
                        {/* <div style={{
                            width: "48px", height: "48px", minWidth: "48px",
                            background: "#1a1a1a", border: "1px solid #2a2a2a",
                            borderRadius: "10px", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            fontSize: "1.4rem",
                        }}>🎓</div> */}

                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontFamily: "'Arial', sans-serif", fontWeight: 700,
                                fontSize: "1rem", color: "#e8e8e8", letterSpacing: "0.01em",
                            }}>
                                Graphic Era Hill University
                            </div>
                            <div style={{
                                marginTop: "0.35rem", display: "flex",
                                alignItems: "center", gap: "0.6rem", flexWrap: "wrap",
                            }}>
                                <span style={{
                                    fontSize: "0.7rem", fontFamily: "'Arial', sans-serif",
                                    color: "#e8d44d", border: "1px solid #e8d44d44",
                                    borderRadius: "4px", padding: "1px 7px",
                                    letterSpacing: "0.05em", background: "#e8d44d0d",
                                }}>B.Tech — CSE</span>
                                <span style={{
                                    fontSize: "0.8rem", fontFamily: "'Arial', sans-serif",
                                    color: "#555", letterSpacing: "0.03em",
                                }}>2023 – 2027 · Dehradun</span>
                            </div>
                        </div>

                        <div style={{ textAlign: "right", fontFamily: "'Arial', sans-serif" }}>
                            <div style={{ fontSize: "0.6rem", color: "#555", letterSpacing: "0.2em", marginBottom: "2px" }}>GRAD</div>
                            <div ref={gradYearRef} style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e8d44d", letterSpacing: "0.05em" }}>'27</div>
                            <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                {["MERN STACK", "AI / ML"].map((label) => (
                                    <div key={label} style={{
                                        display: "flex", alignItems: "center", gap: "0.5rem",
                                        background: "#111", border: "1px solid #222",
                                        borderRadius: "999px", padding: "0.5rem 1.1rem",
                                        fontFamily: "'Arial', sans-serif", fontSize: "0.78rem",
                                        fontWeight: 700, color: "#aaa", letterSpacing: "0.1em",
                                        cursor: "default", transition: "border-color 0.2s, color 0.2s",
                                    }}
                                        onMouseOver={e => { e.currentTarget.style.borderColor = "#e8d44d44"; e.currentTarget.style.color = "#e8d44d" }}
                                        onMouseOut={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#aaa" }}
                                    >{label}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}