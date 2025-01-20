'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', href: '/fonts/your-font.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      // Add other critical resources
    ]

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link')
      Object.entries(link).forEach(([key, value]) => {
        linkElement.setAttribute(key, value)
      })
      document.head.appendChild(linkElement)
    })

    // Optimize animation frame handling
    let frameId: number
    const smoothScroll = () => {
      frameId = requestAnimationFrame(smoothScroll)
    }
    frameId = requestAnimationFrame(smoothScroll)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return null
} 