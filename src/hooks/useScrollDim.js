import { useEffect } from "react"

export default function useScrollDim(elementRefs, currentYRef) {
    useEffect(() => {
        if (!currentYRef || !elementRefs || elementRefs.length === 0) return
        
        let animId
        const animate = () => {
            const vh = window.innerHeight
            
            elementRefs.forEach(({ ref, type }) => {
                if (!ref || !ref.current) return
                
                const rect = ref.current.getBoundingClientRect()
                
                // Elements stay 100% bright until they leave the bottom 60% of the screen.
                // As they climb through the top 40% natively, they progressively dim out.
                const fadeStart = vh * 0.4
                const fadeEnd = -vh * 0.2
                
                const p = Math.min(Math.max((fadeStart - rect.top) / (fadeStart - fadeEnd), 0), 1)
                
                if (type === "yellow") {
                    const rFrom = 232, gFrom = 212, bFrom = 77
                    const rTo = 58, gTo = 53, bTo = 16
                    const r = Math.round(rFrom + (rTo - rFrom) * p)
                    const g = Math.round(gFrom + (gTo - gFrom) * p)
                    const b = Math.round(bFrom + (bTo - bFrom) * p)
                    ref.current.style.color = `rgb(${r},${g},${b})`
                } else if (type === "grey") {
                    const gFrom = 95, gTo = 28
                    const val = Math.round(gFrom + (gTo - gFrom) * p)
                    ref.current.style.color = `rgb(${val},${val},${val})`
                } else if (type === "heading") {
                    const gFrom = 58, gTo = 15
                    const val = Math.round(gFrom + (gTo - gFrom) * p)
                    ref.current.style.color = `rgb(${val},${val},${val})`
                }
            })
            
            animId = requestAnimationFrame(animate)
        }
        
        animId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animId)
    }, [elementRefs, currentYRef])
}
