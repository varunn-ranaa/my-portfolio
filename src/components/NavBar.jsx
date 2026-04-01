import { useEffect, useRef } from "react"

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

export default function NavBar({ activeSection, navScrollTo }) {
    const activeId = SECTION_TO_NAV[activeSection] ?? null

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
                            if (!isActive) e.currentTarget.style.color = "#ffffff"
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