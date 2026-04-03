import { useState, useEffect, useRef, useCallback } from "react"

const words = ["VARUN", "DEVELOPER", "ENGINEER"]

/* ── GitHub Popup ── */
function GitHubPopup() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch("https://api.github.com/users/varunn-ranaa")
            .then(r => r.json())
            .then(setData)
            .catch(() => { })
    }, [])
    return (
        <div style={{
            position: "absolute", left: "2.8rem", top: "2px",
            background: "#161616", border: "1px solid #2a2a2a",
            borderRadius: "12px", padding: "14px 16px",
            width: "220px", zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            animation: "popInGH 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
            <style>{`@keyframes popInGH { from { opacity:0; transform:scale(0.95); transform-origin: top left; } to { opacity:1; transform:scale(1); transform-origin: top left; } }`}</style>
            {data ? (<>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <img src={data.avatar_url} alt="" style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid #333" }} />
                    <div>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>{data.name || data.login}</div>
                        <div style={{ color: "#666", fontSize: "11px", fontFamily: "monospace" }}>@{data.login}</div>
                    </div>
                </div>
                {data.bio && <div style={{ color: "#888", fontSize: "11px", marginBottom: "10px", lineHeight: 1.4, fontFamily: "monospace" }}>{data.bio}</div>}
                <div style={{ display: "flex", gap: "14px" }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#e8d44d", fontWeight: 700, fontSize: "14px", fontFamily: "monospace" }}>{data.public_repos}</div>
                        <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace" }}>repos</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#e8d44d", fontWeight: 700, fontSize: "14px", fontFamily: "monospace" }}>{data.followers}</div>
                        <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace" }}>followers</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#e8d44d", fontWeight: 700, fontSize: "14px", fontFamily: "monospace" }}>{data.following}</div>
                        <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace" }}>following</div>
                    </div>
                </div>
                {data.location && <div style={{ color: "#555", fontSize: "10px", marginTop: "8px", fontFamily: "monospace" }}>📍 {data.location}</div>}
            </>) : (
                <div style={{ color: "#444", fontSize: "12px", fontFamily: "monospace", textAlign: "center", padding: "10px 0" }}>loading...</div>
            )}
        </div>
    )
}

/* ── LinkedIn Popup ── */
function LinkedInPopup() {
    return (
        <div style={{
            position: "absolute", left: "2.8rem", top: "-50px",
            background: "#161616",
            border: "1px solid #2a2a2a",
            borderRadius: "12px",
            padding: "14px 16px",
            width: "220px",
            zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            animation: "popInLI 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
            <style>{`
                @keyframes popInLI {
                    from { opacity:0; transform:scale(0.95); transform-origin: top left; }
                    to { opacity:1; transform:scale(1); transform-origin: top left; }
                }
            `}</style>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <img
                    src="/me.jpeg"
                    alt="Varun"
                    style={{
                        width: 38, height: 38, borderRadius: "50%",
                        objectFit: "cover", border: "2px solid #333",
                        boxShadow: "0 0 10px rgba(232,212,77,0.3)"
                    }}
                />
                <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>Varun Rana</div>
                    <div style={{ color: "#e8d44d", fontSize: "11px", fontFamily: "monospace" }}>LinkedIn</div>
                </div>
            </div>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "10px", lineHeight: 1.4, fontFamily: "monospace" }}>
                CS undergrad.
            </div>
            <a
                href="https://in.linkedin.com/in/varun-rana-6a7560324"
                target="_blank" rel="noreferrer"
                style={{
                    display: "block", textAlign: "center", padding: "6px",
                    borderRadius: "6px", background: "#e8d34d84",
                    color: "#fff", fontSize: "11px", textDecoration: "none",
                    fontFamily: "monospace", marginBottom: "6px"
                }}
            >
                View Profile
            </a>
            <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace" }}>📍 Dehradun, India</div>
        </div>
    )
}

// Removed LiquidCursor component to avoid duplicate yellow dots

/* ── Circular Image Reveal (fixed, no layout shift) ── */
function ImageReveal({ globalMouse, onHoverChange }) {
    const containerRef = useRef(null)
    const overlayRef = useRef(null)
    const blobCursorRef = useRef(null)
    const rafRef = useRef(null)
    const mousePos = useRef({ x: -999, y: -999 })
    const currentPos = useRef({ x: -999, y: -999 })
    const [isHovering, setIsHovering] = useState(false)
    const [revealed, setRevealed] = useState(false)

    const LERP = 0.12
    const CIRCLE_R = 150

    const updateMask = useCallback(() => {
        if (!overlayRef.current || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()

        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * LERP
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * LERP

        const rx = currentPos.current.x - rect.left
        const ry = currentPos.current.y - rect.top

        const r = revealed ? CIRCLE_R : 0

        // Overlay image mask — liquid-shaped via border-radius animation
        overlayRef.current.style.maskImage =
            `radial-gradient(circle ${r}px at ${rx}px ${ry}px, black 55%, transparent 100%)`
        overlayRef.current.style.webkitMaskImage =
            `radial-gradient(circle ${r}px at ${rx}px ${ry}px, black 55%, transparent 100%)`

        // Move the blob cursor div to follow mouse
        if (blobCursorRef.current) {
            blobCursorRef.current.style.left = `${rx - CIRCLE_R}px`
            blobCursorRef.current.style.top = `${ry - CIRCLE_R}px`
        }

        rafRef.current = requestAnimationFrame(updateMask)
    }, [revealed])

    useEffect(() => {
        rafRef.current = requestAnimationFrame(updateMask)
        return () => cancelAnimationFrame(rafRef.current)
    }, [updateMask])

    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        if (globalMouse) globalMouse.current = { x: e.clientX, y: e.clientY }
    }, [globalMouse])

    const handleMouseEnter = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        currentPos.current = { x: e.clientX, y: e.clientY }
        if (globalMouse) globalMouse.current = { x: e.clientX, y: e.clientY }
        setIsHovering(true)
        setRevealed(true)
        document.body.classList.add("hide-cursor-ball")
    }, [globalMouse])

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false)
        setRevealed(false)
        document.body.classList.remove("hide-cursor-ball")
    }, [])

    return (
        /*
         * FIX 1 — RIGHT IMAGE SHIFT:
         * flex-shrink:0  +  explicit width/height via aspectRatio keep this
         * column's size 100% independent of the left text column.
         * alignSelf:"flex-start" also removes any implicit stretch that could
         * cause micro-shifts.
         *
         * FIX 2 — NAVBAR OVERLAP:
         * zIndex is intentionally lower than the navbar (assume navbar z ≥ 50).
         * pointerEvents on the container are "auto" only inside; the image
         * never bleeds above the hero section boundary.
         */
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: "relative",
                /* Fixed intrinsic size — never influenced by sibling text */
                width: "100%",        // fills the grid column
                aspectRatio: "3/4",
                flexShrink: 0,
                flexGrow: 0,
                /* Right margin so image doesn't touch the viewport edge */
                marginRight: "1.5rem",
                transform: "translateX(-2.5rem)", /* Safely pull the image slightly left */
                /* Contain everything; cursor:none hides system cursor on hover */
                borderRadius: "20px",
                overflow: "hidden",
                cursor: isHovering ? "none" : "auto",
                boxShadow: "0 0 0 1px #2a2a2a, 0 32px 80px rgba(0,0,0,0.8)",
                /* isolate stacking context so zIndex is local */
                isolation: "isolate",
                zIndex: 1,
            }}
        >
            {/* BASE image — always visible, background matches site bg (#0d0d0d) */}
            <img
                src="/base.png"
                alt="Base"
                draggable={false}
                style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    userSelect: "none",
                    display: "block",
                    background: "#0d0d0d",
                    transform: isHovering ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            />

            {/* OVERLAY image — circular liquid mask following cursor */}
            <img
                ref={overlayRef}
                src="/above.png"
                alt="Reveal"
                draggable={false}
                style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    userSelect: "none",
                    display: "block",
                    maskImage: "radial-gradient(circle 0px at 55% 55%, black 55%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(circle 0px at 50% 50%, black 55%, transparent 100%)",
                    willChange: "mask-image, transform",
                    transform: isHovering ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            />

            {/*
             * FIX 3 — LIQUID BLOB BOUNDARY (no yellow ring, just the morphing
             * border-shape of the reveal circle itself gives the "waving" feel).
             * We draw a translucent animated div on top that uses border-radius
             * animation to look liquid.  It is purely decorative and has
             * pointerEvents:none so it never interferes with mouse tracking.
             */}
            {isHovering && (
                <div
                    ref={blobCursorRef}
                    style={{
                        position: "absolute",
                        width: CIRCLE_R * 2,
                        height: CIRCLE_R * 2,
                        pointerEvents: "none",
                        mixBlendMode: "overlay",
                        /* subtle inner glow — NO yellow border */
                        background: "radial-gradient(circle, rgba(232,212,77,0.10) 0%, transparent 70%)",
                        animation: "liquidWave 2.2s ease-in-out infinite",
                        willChange: "border-radius, left, top",
                    }}
                />
            )}

            <style>{`
                @keyframes liquidWave {
                    0%   { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
                    20%  { border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%; }
                    40%  { border-radius: 40% 60% 50% 50% / 50% 50% 40% 60%; }
                    60%  { border-radius: 55% 45% 60% 40% / 40% 60% 55% 45%; }
                    80%  { border-radius: 45% 55% 45% 55% / 55% 45% 50% 50%; }
                    100% { border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%; }
                }
            `}</style>
        </div>
    )
}

/* ── Main Hero ── */
export default function Hero({ setHovered, currentYRef }) {
    const [displayed, setDisplayed] = useState("")
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [ghHover, setGhHover] = useState(false)
    const [liHover, setLiHover] = useState(false)
    const [isOverImage, setIsOverImage] = useState(false)
    const globalMouse = useRef({ x: -999, y: -999 })
    const heyTextRef = useRef(null)
    const varunTextRef = useRef(null)

    /* Track global mouse for the custom cursor dot */
    useEffect(() => {
        const move = (e) => { globalMouse.current = { x: e.clientX, y: e.clientY } }
        window.addEventListener("mousemove", move, { passive: true })
        return () => window.removeEventListener("mousemove", move)
    }, [])

    /* Scroll-driven color animation */
    useEffect(() => {
        if (!currentYRef) return
        let animId
        const animate = () => {
            const scrollY = currentYRef.current
            const vh = window.innerHeight
            const fadeStart = 0, fadeEnd = vh * 0.85
            const p = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)

            const gFrom = 95, gTo = 28
            const gVal = Math.round(gFrom + (gTo - gFrom) * p)
            if (heyTextRef.current) heyTextRef.current.style.color = `rgb(${gVal},${gVal},${gVal})`

            const rFrom = 232, gYFrom = 212, bFrom = 77
            const rTo = 58, gYTo = 53, bTo = 16
            const rV = Math.round(rFrom + (rTo - rFrom) * p)
            const gV = Math.round(gYFrom + (gYTo - gYFrom) * p)
            const bV = Math.round(bFrom + (bTo - bFrom) * p)
            if (varunTextRef.current) varunTextRef.current.style.color = `rgb(${rV},${gV},${bV})`

            animId = requestAnimationFrame(animate)
        }
        animId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animId)
    }, [currentYRef])

    /* Typing animation — unchanged */
    useEffect(() => {
        const currentWord = words[wordIndex]
        if (!deleting && charIndex <= currentWord.length) {
            const t = setTimeout(() => { setDisplayed(currentWord.slice(0, charIndex)); setCharIndex(p => p + 1) }, 200)
            return () => clearTimeout(t)
        } else if (!deleting && charIndex > currentWord.length) {
            const t = setTimeout(() => setDeleting(true), 2000)
            return () => clearTimeout(t)
        } else if (deleting && charIndex > 0) {
            const t = setTimeout(() => { setCharIndex(p => p - 1); setDisplayed(currentWord.slice(0, charIndex - 1)) }, 150)
            return () => clearTimeout(t)
        } else if (deleting && charIndex === 0) {
            setDeleting(false)
            setWordIndex(p => (p + 1) % words.length)
        }
    }, [charIndex, deleting, wordIndex])

    return (
        <div style={{
            background: "#0d0d0d",
            minHeight: "100vh",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            overflow: "hidden",
            cursor: "none",
            paddingTop: "80px", /* safe space for navbar */
            boxSizing: "border-box",
        }}>

            {/* Using the global App.jsx cursor, no local LiquidCursor here. */}

            {/* LEFT — Social Icons
                FIX 2: zIndex:50 ensures it sits above the image (zIndex:1) but
                the pointer-events on the image are contained inside its own
                overflow:hidden box, so no overlap issue.                      */}
            <div style={{
                position: "absolute", left: "2.8rem", top: "40px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-start",
                zIndex: 50,
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>

                    {/* GitHub */}
                    <div style={{ position: "relative" }}
                        onMouseEnter={() => setGhHover(true)}
                        onMouseLeave={() => setGhHover(false)}
                    >
                        <a href="https://github.com/varunn-ranaa" target="_blank" rel="noreferrer"
                            style={{ color: ghHover ? "#e8d44d" : "#888", transition: "color 0.2s", display: "block" }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        {ghHover && <GitHubPopup />}
                    </div>

                    {/* LinkedIn */}
                    <div style={{ position: "relative" }}
                        onMouseEnter={() => setLiHover(true)}
                        onMouseLeave={() => setLiHover(false)}
                    >
                        <a href="https://in.linkedin.com/in/varun-rana-6a7560324" target="_blank" rel="noreferrer"
                            style={{ color: liHover ? "#e8d44d" : "#888", transition: "color 0.2s", display: "block" }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 .77 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                            </svg>
                        </a>
                        {liHover && <LinkedInPopup />}
                    </div>

                </div>
            </div>

            {/*
             * MAIN CONTENT — full-width grid pinned to viewport edges.
             * Left col: text (social icons offset accounted for with padding-left).
             * Right col: image flush to the right edge with a small margin gap.
             * No maxWidth cap so the image truly reaches the right end.
             */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr clamp(260px, 31vw, 430px)",
                alignItems: "center",
                columnGap: "clamp(1rem, 2vw, 3rem)",
                width: "100%",
                maxWidth: "1600px",
                margin: "0 auto",
                /* Left padding adjusted to pull text slightly back to the left */
                padding: "0 1rem 0 clamp(10rem, 16vw, 22rem)",
                boxSizing: "border-box",
            }}>

                {/* LEFT — Text, clipped so it never bleeds into image column */}
                <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "flex-start", justifyContent: "center",
                    textAlign: "left", position: "relative", zIndex: 5,
                    minWidth: 0,
                    overflow: "hidden",
                }}>
                    <div
                        ref={heyTextRef}
                        onMouseEnter={() => setHovered && setHovered(true)}
                        onMouseLeave={() => setHovered && setHovered(false)}
                        style={{
                            fontWeight: 900,
                            color: "#5f5f5f",
                            lineHeight: 1.05,
                            userSelect: "none",
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(3rem, 7vw, 8rem)",
                            letterSpacing: "0.05em",
                            marginBottom: "2rem",
                            cursor: "none",
                            willChange: "color",
                            whiteSpace: "nowrap",
                        }}>HEY, I'M</div>

                    <div
                        ref={varunTextRef}
                        onMouseEnter={() => setHovered && setHovered(true)}
                        onMouseLeave={() => setHovered && setHovered(false)}
                        style={{
                            fontWeight: 900,
                            color: "#e8d44d",
                            lineHeight: 1.05,
                            cursor: "none",
                            userSelect: "none",
                            minWidth: "2ch",
                            minHeight: "1.1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            fontFamily: "'Noto Sans Linear A', sans-serif",
                            fontSize: "clamp(3rem, 7vw, 8rem)",
                            letterSpacing: "0.05em",
                            willChange: "color",
                            whiteSpace: "nowrap",
                        }}>
                        {displayed}
                    </div>
                </div>

                {/* RIGHT — Image */}
                <ImageReveal
                    globalMouse={globalMouse}
                    onHoverChange={(hovering) => {
                        setIsOverImage(hovering)
                    }}
                />

            </div>
        </div>
    )
}