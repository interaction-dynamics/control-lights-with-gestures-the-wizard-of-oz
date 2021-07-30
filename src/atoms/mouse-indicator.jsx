import React, { useLayoutEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import LottieIcon from '~atoms/lottie-icon'

import scrollDown from '~assets/scroll-down-6-auto-edited.json'

const MouseIndicator = () => {
  // https://www.react-spring.io/docs/hooks/basics
  const [{ opacity }, set] = useSpring(() => ({ opacity: 1 }))

  const hide = () => set({ opacity: 0 })

  useLayoutEffect(() => {
    window.addEventListener('scroll', hide, { capture: true })

    return window.removeEventListener('scroll', hide)
  }, [])

  const onClick = () => {
    const element = document.getElementById('stats')
    if (!element) {
      return
    }
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  return (
    <animated.div
      className="hidden md:block w-16"
      style={{
        opacity,
        transform: opacity.interpolate(
          o => `translateY(${(1 - o) * 500}px) scale(1.5)`
        ),
        display: opacity.interpolate(o => (o === 0 ? 'none' : 'display')),
      }}
      onClick={onClick}
    >
      <LottieIcon icon={scrollDown} loop autoplay />
    </animated.div>
  )
}

export default MouseIndicator
