import { useState, useEffect } from "react"
import ParticleCanvas from "./ParticleCanvas"

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
            animation: "popIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
            <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
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
            background: "#161616", border: "1px solid #2a2a2a",
            borderRadius: "12px", padding: "14px 16px",
            width: "220px", zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            animation: "popIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <img src="/me.jpeg" alt="Varun" style={{
                    width: 38, height: 38, borderRadius: "50%",
                    objectFit: "cover", border: "2px solid #333",
                    boxShadow: "0 0 10px rgba(232,212,77,0.3)"
                }} />
                <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>Varun Rana</div>
                    <div style={{ color: "#e8d44d", fontSize: "11px", fontFamily: "monospace" }}>LinkedIn</div>
                </div>
            </div>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "10px", lineHeight: 1.4, fontFamily: "monospace" }}>
                CS undergrad.
            </div>
            <a href="https://in.linkedin.com/in/varun-rana-6a7560324" target="_blank" rel="noreferrer"
                style={{
                    display: "block", textAlign: "center", padding: "6px",
                    borderRadius: "6px", background: "#e8d34d84",
                    color: "#fff", fontSize: "11px", textDecoration: "none",
                    fontFamily: "monospace", marginBottom: "6px"
                }}>
                View Profile
            </a>
            <div style={{ color: "#555", fontSize: "10px", fontFamily: "monospace" }}>📍 Dehradun, India</div>
        </div>
    )
}

export default function Hero({ setHovered }) {
    const [displayed, setDisplayed] = useState("")
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [ghHover, setGhHover] = useState(false)
    const [liHover, setLiHover] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    useEffect(() => {
        const currentWord = words[wordIndex]
        if (!deleting && charIndex <= currentWord.length) {
            const t = setTimeout(() => {
                setDisplayed(currentWord.slice(0, charIndex))
                setCharIndex(p => p + 1)
            }, 200)
            return () => clearTimeout(t)
        } else if (!deleting && charIndex > currentWord.length) {
            const t = setTimeout(() => setDeleting(true), 2000)
            return () => clearTimeout(t)
        } else if (deleting && charIndex > 0) {
            const t = setTimeout(() => {
                setCharIndex(p => p - 1)
                setDisplayed(currentWord.slice(0, charIndex - 1))
            }, 150)
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
        }}>
            <ParticleCanvas count={isMobile ? 40 : 100} />

            {/* LEFT — Social Icons (hidden on mobile, shown at bottom instead) */}
            {!isMobile && (
                <div style={{
                    position: "absolute", left: "2.8rem", top: 0, bottom: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    zIndex: 50,
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                        <div style={{ position: "relative" }}
                            onMouseEnter={() => setGhHover(true)}
                            onMouseLeave={() => setGhHover(false)}>
                            <a href="https://github.com/varunn-ranaa" target="_blank" rel="noreferrer"
                                style={{ color: ghHover ? "#e8d44d" : "#888", transition: "color 0.2s", display: "block" }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </a>
                            {ghHover && <GitHubPopup />}
                        </div>

                        <div style={{ position: "relative" }}
                            onMouseEnter={() => setLiHover(true)}
                            onMouseLeave={() => setLiHover(false)}>
                            <a href="https://in.linkedin.com/in/varun-rana-6a7560324" target="_blank" rel="noreferrer"
                                style={{ color: liHover ? "#e8d44d" : "#888", transition: "color 0.2s", display: "block" }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                                </svg>
                            </a>
                            {liHover && <LinkedInPopup />}
                        </div>
                    </div>
                </div>
            )}

            {/* CENTER */}
            <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", position: "relative", zIndex: 5,
                padding: isMobile ? "0 1.5rem" : "0",
            }}>
                <div
                    onMouseEnter={() => !isMobile && setHovered(true)}
                    onMouseLeave={() => !isMobile && setHovered(false)}
                    style={{
                        fontWeight: 900, color: "#5f5f5f", lineHeight: 1.05,
                        userSelect: "none", fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "0.05em",
                        marginBottom: "2.5rem", cursor: isMobile ? "default" : "none",
                    }}>HEY, I'M</div>

                <div
                    onMouseEnter={() => !isMobile && setHovered(true)}
                    onMouseLeave={() => !isMobile && setHovered(false)}
                    style={{
                        fontWeight: 900, color: "#e8d44d", lineHeight: 1.05,
                        cursor: isMobile ? "default" : "none",
                        userSelect: "none", minWidth: "2ch",
                        minHeight: "1.1em", display: "flex", alignItems: "center",
                        justifyContent: "center", fontFamily: "'Noto Sans Linear A', sans-serif",
                        fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "0.05em",
                    }}>
                    {displayed}
                </div>

                {/* Mobile social icons — shown below text */}
                {isMobile && (
                    <div style={{
                        display: "flex", gap: "2rem",
                        marginTop: "3rem", zIndex: 50,
                    }}>
                        <a href="https://github.com/varunn-ranaa" target="_blank" rel="noreferrer"
                            style={{ color: "#888" }}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .3.2.68.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://in.linkedin.com/in/varun-rana-6a7560324" target="_blank" rel="noreferrer"
                            style={{ color: "#888" }}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}