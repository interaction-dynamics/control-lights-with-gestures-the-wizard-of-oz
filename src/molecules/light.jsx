import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { throttle } from 'lodash'

import Button from '~atoms/button'

const Light = ({ name, id, className, state }) => {
  const [brightnessValue, setBrightness] = useState(
    state.on ? (state.bri / 254) * 100 : 0
  )

  const changeBrightnessThrottled = useCallback(
    throttle(value => {
      axios.put(
        id ? `/lights/${id}/brightness/${value}` : `/lights/brightness/${value}`
      )
    }, 50),
    []
  )

  const changeBrightness = event => {
    const { value } = event.target
    setBrightness(value)

    changeBrightnessThrottled(value)
  }

  const startSelectionEffect = () => {
    axios.put(id ? `/lights/${id}/selection` : `/lights/selection`)
  }

  return (
    <div className={`flex p-1 items-center ${className}`}>
      <div className="text-white pr-10 flex-300 text-base">{name}</div>
      {/* <Button className="mr-2" onClick={start}>
        start
      </Button>
      <Button className="mr-10" onClick={stop}>
        stop
      </Button> */}
      <Button className="mr-4" onClick={startSelectionEffect}>
        selected
      </Button>

      <input
        type="range"
        min="0"
        max="100"
        value={brightnessValue}
        className="flex-300 cursor-pointer"
        onChange={changeBrightness}
      />
    </div>
  )
}

Light.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number,
  className: PropTypes.string,
  state: PropTypes.shape({
    on: PropTypes.bool,
    bri: PropTypes.number,
  }),
}

Light.defaultProps = {
  className: '',
  id: 0,
  state: { on: false, bri: 254 },
}

export default Light
