'use client'

import { ReactNode, MouseEventHandler } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export const AnimatedSection = ({ 
  children, 
  className = '', 
  onMouseEnter, 
  onMouseLeave 
}: AnimatedSectionProps) => {
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
}

export const AnimatedCard = ({ children, delay = 0 }: AnimatedCardProps) => {
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

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedText = ({ children, className = '' }: AnimatedTextProps) => {
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

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const AnimatedImage = ({ src, alt, className = '' }: AnimatedImageProps) => {
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

interface AnimatedButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler;
  className?: string;
}

export const AnimatedButton = ({ children, onClick, className = '' }: AnimatedButtonProps) => {
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