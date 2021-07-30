import React from 'react'
import PropTypes from 'prop-types'

import { useSpring, animated } from 'react-spring'

const StatCard = ({ number, description, isVisible, suffix }) => {
  const style = useSpring({ number: isVisible ? number : 0 })

  return (
    <div className="p-8 rounded text-center md:text-left">
      <animated.div className="text-4xl md:text-6xl text-white-500 font-normal">
        {style.number.to(x =>
          x < number || suffix ? `${x.toFixed(0)}${suffix}` : `${x}+`
        )}
      </animated.div>
      <div className="text-purple-500 text-xl pt-2">{description}</div>
    </div>
  )
}

StatCard.propTypes = {
  number: PropTypes.number,
  description: PropTypes.string,
  isVisible: PropTypes.bool,
  suffix: PropTypes.string,
}

StatCard.defaultProps = {
  number: 0,
  description: '',
  isVisible: false,
  suffix: '',
}

export default StatCard
