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
                
                const focusTop = vh * 0.15
                const focusBottom = vh * 0.55
                const dullTop = -vh * 0.05
                const dullBottom = vh * 0.85
                
                let p = 0
                if (rect.top > focusBottom) {
                    p = (rect.top - focusBottom) / (dullBottom - focusBottom)
                } else if (rect.top < focusTop) {
                    p = (focusTop - rect.top) / (focusTop - dullTop)
                }
                p = Math.min(Math.max(p, 0), 1)
                
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
                } else if (type === "brightText") {
                    const gFrom = 240, gTo = 60
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
