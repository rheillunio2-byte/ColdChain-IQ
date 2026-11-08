import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', stiffness: 460, damping: 38 }

export const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } },
}
export const stagger = { initial: {}, animate: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }
export const rise = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

/** Counts from 0 to `target`; jumps straight to the value when reduced motion is requested. */
export function useCountUp(target, decimals = 0, duration = 1.1) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? target : 0)
  useEffect(() => {
    if (reduce) { setV(target); return undefined }
    const controls = animate(0, target, { duration, ease, onUpdate: setV })
    return () => controls.stop()
  }, [target, reduce, duration])
  return v.toFixed(decimals)
}
