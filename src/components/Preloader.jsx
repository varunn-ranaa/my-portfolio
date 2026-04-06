import { useState, useEffect } from "react"
import ParticleCanvas from "./ParticleCanvas"

export default function Preloader({ onComplete }) {
    const [phase, setPhase] = useState("idle")

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("grow"), 100)
        const t2 = setTimeout(() => setPhase("dim"), 2600)
        const t3 = setTimeout(() => {
            setPhase("done")
            onComplete?.()
        }, 3500)
        return () => [t1, t2, t3].forEach(clearTimeout)
    }, [onComplete])

    if (phase === "done") return null

    const dimming = phase === "dim"

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#0a0a0a",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            opacity: dimming ? 0 : 1,
            transition: dimming ? "opacity 1s cubic-bezier(0.7, 0, 1, 1)" : "none",
        }}>
            {/* ✅ Yahan aata hai — return ke andar */}
            <ParticleCanvas />

            <div style={{
                position: "relative", zIndex: 2,
                display: "flex", flexDirection: "column", alignItems: "center",
                width: "100vw", padding: "0 2vw", boxSizing: "border-box",
            }}>
                <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.15em",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(232,212,77,0.75)",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    display: "block",
                    fontSize: phase === "idle" ? "0.6rem" : "clamp(3rem, 20vw, 12rem)",
                    opacity: phase === "idle" ? 0 : phase === "grow" ? 1 : 0.07,
                    transition: phase === "grow"
                        ? "font-size 2.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease"
                        : phase === "dim" ? "opacity 0.9s ease" : "none",
                }}>
                    WELCOME
                </span>

                <div style={{
                    position: "relative", height: "2px", width: "100%",
                    marginTop: "0.2rem", overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", top: 0, left: "-100%",
                        width: "100%", height: "100%",
                        background: "linear-gradient(90deg, transparent 0%, rgba(232,212,77,0.15) 50%, rgba(232,212,77,0.6) 85%, #e8d44d 100%)",
                        transform: phase === "idle" ? "translateX(0%)" : "translateX(220%)",
                        transition: phase === "grow"
                            ? "transform 1.6s cubic-bezier(0.25, 0.1, 0.2, 1) 0.5s"
                            : "none",
                    }} />
                    <div style={{
                        position: "absolute", top: "-3px", left: "-100%",
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: "#e8d44d",
                        boxShadow: "0 0 10px #e8d44d, 0 0 24px #e8d44d99, 0 0 48px #e8d44d44",
                        transform: phase === "idle" ? "translateX(0%)" : "translateX(3300%)",
                        transition: phase === "grow"
                            ? "transform 1.6s cubic-bezier(0.25, 0.1, 0.2, 1) 0.5s"
                            : "none",
                        opacity: phase === "grow" ? 1 : 0,
                    }} />
                </div>
            </div>
        </div>
    )
}