import { useEffect, useRef } from "react"

export default function ParticleCanvas({
    count = 40,
    opacity = 0.9,
    minSize = 0.5,
    maxSize = 2,
    speed = 0.3,
    style = {}
}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const dpr = window.devicePixelRatio || 1

        const resize = () => {
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            ctx.scale(dpr, dpr)
            canvas.style.width = window.innerWidth + "px"
            canvas.style.height = window.innerHeight + "px"
        }
        resize()
        window.addEventListener("resize", resize)

        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: Math.random() * (maxSize - minSize) + minSize,
            opacity: Math.random() * 0.3 + 0.05,
            gold: Math.random() > 0.7,
        }))

        let raf
        const draw = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = window.innerWidth
                if (p.x > window.innerWidth) p.x = 0
                if (p.y < 0) p.y = window.innerHeight
                if (p.y > window.innerHeight) p.y = 0
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.gold
                    ? `rgba(232, 212, 77, ${p.opacity})`
                    : `rgba(255, 255, 255, ${p.opacity * 0.5})`
                ctx.fill()
            }
            raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [count, opacity, minSize, maxSize, speed])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                opacity,
                pointerEvents: "none",
                zIndex: 0,
                ...style,
            }}
        />
    )
}