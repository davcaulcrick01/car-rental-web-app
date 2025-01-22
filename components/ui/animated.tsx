'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'

export const AnimatedSection = ({ children, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.9)',
    },
    delay: delay * 100,
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  )
}

export const AnimatedText = ({ children, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedImage = ({ src, alt, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    />
  )
}

export const AnimatedButton = ({ children, onClick, className = '' }) => {
  const springProps = useSpring({
    from: { scale: 1 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.05 })
        await next({ scale: 1 })
      }
    },
    config: { tension: 300, friction: 10 }
  })

  return (
    <animated.button
      onClick={onClick}
      style={springProps}
      className={className}
    >
      {children}
    </animated.button>
  )
} 