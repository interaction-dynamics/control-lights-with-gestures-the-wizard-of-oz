import React from 'react'
import PropTypes from 'prop-types'

import Button from '~atoms/button'

const Light = ({ name, id, className }) => (
  <div className={`flex p-1 items-center ${className}`}>
    <div className="text-white pr-10 flex-200">{name}</div>
    <Button className="mr-2" disabled>
      start
    </Button>
    <Button className="mr-10">stop</Button>
    <Button className="mr-4">selected</Button>

    <input type="range" min="1" max="100" value="50" className="flex-300" />
  </div>
)

Light.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Light.defaultProps = {
  className: '',
}

export default Light
