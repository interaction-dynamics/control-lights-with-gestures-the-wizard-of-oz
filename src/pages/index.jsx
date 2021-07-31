import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Layout from '~organisms/layout'
import Footer from '~molecules/footer'
import Light from '~molecules/light'

const IndexPage = () => {
  const [lights, setLights] = useState([])

  useEffect(() => {
    axios.get('/lights').then(({ data }) => {
      setLights(data)
    })
  }, [])

  return (
    <Layout className="flex flex-col items-stretch">
      <div className="p-6 flex-auto">
        <Light name="all" className="pb-8" />

        {lights.map(light => (
          <Light
            name={light.data.name}
            key={light.data.id}
            id={light.data.id}
            state={light.data.state}
          />
        ))}
      </div>
      <Footer />
    </Layout>
  )
}

export default IndexPage
