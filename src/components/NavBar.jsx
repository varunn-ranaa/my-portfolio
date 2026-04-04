import { useEffect, useRef } from "react"

const NAV_ITEMS = [
    { label: "About", id: "about-me" },
    { label: "Work", id: "work" },
    { label: "Skills", id: "skills" },
    { label: "Connect", id: "contact" },
]

const SECTION_TO_NAV = {
    "about-me": "about-me",
    "work": "work",
    "skills": "skills",
    "contact": "contact",
}

export default function NavBar({ activeSection, navScrollTo }) {
    const activeId = SECTION_TO_NAV[activeSection] || "hero"

    return (
        <nav style={{
            position: "fixed",
            top: "25px",
            left: "clamp(40%, 45%, 45%)", /* Centered with a bias to the left */
            transform: "translateX(-40%)", /* Pull it slightly left of its center */
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            zIndex: 100,
            background: "rgba(22, 22, 22, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "1rem 3rem",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            width: "max-content",
            maxWidth: "90vw",
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
                            color: isActive ? "#e8d44d" : "#ffffff99",
                            fontSize: "0.95rem",
                            fontWeight: isActive ? "600" : "500",
                            fontFamily: "'Inter', sans-serif, system-ui",
                            letterSpacing: isActive ? "0.12em" : "0.08em",
                            transition: "color 0.35s ease, letter-spacing 0.35s ease",
                            outline: "none",
                            position: "relative",
                            padding: "0.3rem 0",
                            display: "flex",
                            justifyContent: "center",
                            minWidth: "max-content"
                        }}
                        onMouseEnter={e => {
                            if (!isActive) e.currentTarget.style.color = "#e8d44d"
                        }}
                        onMouseLeave={e => {
                            if (!isActive) e.currentTarget.style.color = "#ffffff99"
                        }}
                    >
                        <span>{label}</span>
                        <span style={{
                            position: "absolute",
                            bottom: "0px",
                            right: 0,
                            width: isActive ? "100%" : "0%",
                            height: "2px",
                            background: "#e8d44d",
                            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            display: "block",
                        }} />
                    </button>
                )
            })}
        </nav>
    )
}