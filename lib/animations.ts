import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
}

export const slideIn = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
}

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6 }
}

export const initScrollAnimations = () => {
  gsap.utils.toArray('.gsap-reveal').forEach((elem: any) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 80%',
      end: 'bottom 20%',
      markers: false,
      onEnter: () => {
        gsap.fromTo(
          elem,
          { y: 60, opacity: 0 },
          { duration: 1, y: 0, opacity: 1, ease: 'power3.out' }
        )
      }
    })
  })
} 