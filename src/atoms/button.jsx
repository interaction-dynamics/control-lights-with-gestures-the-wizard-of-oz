import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ className, ...props }) => (
  <button
    type="button"
    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  />
)

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  className: '',
  children: '',
  onClick: () => {},
}

export default Button
