import { useRef, useState } from "react"

const NAV_ITEMS = [
    { label: "About Me", id: "about-me" },
    { label: "Work",     id: "work"     },
    { label: "Skills",   id: "skills"   },
    { label: "Connect",  id: "contact"  },
]

const SECTION_TO_NAV = {
    "hero":     null,
    "about-me": "about-me",
    "work":     "work",
    "skills":   "skills",
    "contact":  "contact",
}

export default function NavBar({ activeSection, navScrollTo, isMobile }) {
    const activeId = SECTION_TO_NAV[activeSection] ?? null
    const [menuOpen, setMenuOpen] = useState(false)

    if (isMobile) {
        return (
            <>
                {/* Hamburger button */}
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    style={{
                        position: "fixed",
                        top: "1.2rem",
                        right: "1.2rem",
                        zIndex: 200,
                        background: "rgba(13,13,13,0.85)",
                        border: "1px solid #2a2a2a",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        backdropFilter: "blur(8px)",
                    }}
                    aria-label="Menu"
                >
                    {[0,1,2].map(i => (
                        <span key={i} style={{
                            display: "block",
                            width: "22px",
                            height: "2px",
                            background: menuOpen ? "#e8d44d" : "#888",
                            borderRadius: "2px",
                            transition: "background 0.2s, transform 0.3s, opacity 0.3s",
                            transform: menuOpen
                                ? i === 0 ? "translateY(7px) rotate(45deg)"
                                : i === 2 ? "translateY(-7px) rotate(-45deg)"
                                : "scaleX(0)"
                                : "none",
                            opacity: menuOpen && i === 1 ? 0 : 1,
                        }} />
                    ))}
                </button>

                {/* Dropdown menu */}
                <div style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "220px",
                    background: "rgba(10,10,10,0.97)",
                    border: "1px solid #1e1e1e",
                    borderRadius: "0 0 0 16px",
                    zIndex: 190,
                    padding: "5rem 1.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    transform: menuOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    backdropFilter: "blur(12px)",
                }}>
                    {NAV_ITEMS.map(({ label, id }) => {
                        const isActive = activeId === id
                        return (
                            <button
                                key={id}
                                onClick={() => {
                                    navScrollTo(id)
                                    setMenuOpen(false)
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: isActive ? "#e8d44d" : "#666",
                                    fontSize: "1rem",
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    letterSpacing: "0.2em",
                                    padding: "0.75rem 0",
                                    textAlign: "left",
                                    borderBottom: "1px solid #1a1a1a",
                                    transition: "color 0.2s",
                                }}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
            </>
        )
    }

    // Desktop nav (original)
    return (
        <nav style={{
            position: "fixed",
            right: "3.5rem",
            top: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.5rem",
            zIndex: 100,
        }}>
            {NAV_ITEMS.map(({ label, id }) => {
                const isActive = activeId === id
                return (
                    <button
                        key={id}
                        onClick={() => navScrollTo(id)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: isActive ? "#e8d44d" : "#ffffff66",
                            fontSize: isActive ? "0.95rem" : "0.88rem",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: isActive ? "0.12em" : "0.08em",
                            transition: "color 0.35s ease, font-size 0.35s ease, letter-spacing 0.35s ease",
                            padding: "0.3rem 0",
                            textAlign: "right",
                            position: "relative",
                            lineHeight: 1,
                        }}
                        onMouseEnter={e => {
                            if (!isActive) e.currentTarget.style.color = "#e8d44d"
                        }}
                        onMouseLeave={e => {
                            if (!isActive) e.currentTarget.style.color = "#ffffff66"
                        }}
                    >
                        <span style={{
                            position: "absolute",
                            bottom: "2px",
                            right: 0,
                            width: isActive ? "100%" : "0%",
                            height: "1px",
                            background: "#e8d44d",
                            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            display: "block",
                        }} />
                        {label}
                    </button>
                )
            })}
        </nav>
    )
}