import React from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'

const LottieIcon = ({ icon, className, ...props }) => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    ...props,
  }

  return <Lottie options={defaultOptions} className={className} />
}

LottieIcon.propTypes = {
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
}

LottieIcon.defaultProps = {
  className: '',
}

export default LottieIcon
