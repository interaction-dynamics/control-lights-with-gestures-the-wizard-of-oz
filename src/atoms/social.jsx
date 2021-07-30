import React from 'react'
import PropTypes from 'prop-types'

import style from './social.style'

const Social = ({ icon: Icon, title, url, className }) => (
  <a
    href={url}
    className={`${style.Social} ${className}`}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon />
  </a>
)

Social.defaultProps = {
  icon: () => null,
  title: '',
  url: '',
  className: '',
}

Social.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
}

export default Social
