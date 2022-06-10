import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Layout from '~organisms/layout'
import Footer from '~molecules/footer'
import Light from '~molecules/light'
import Button from '~atoms/button'

const IndexPage = () => {
  const [lights, setLights] = useState([])
  const [scenes, setScenes] = useState([])

  useEffect(() => {
    axios.get('/lights').then(({ data }) => {
      setLights(data)
    })

    axios.get('/scenes').then(({ data }) => {
      setScenes(data)
    })
  }, [])

  const onClick = scene => async () => {
    await axios.put(`/scenes/${scene.data.id}`)
  }

  return (
    <Layout className="flex flex-col items-stretch">
      <div className="p-6 flex-auto">
        <Light name="all" />
        <div className="flex p-1 items-center pb-8 flex-wrap	">
          {scenes.map(scene => (
            <Button
              className="mr-2"
              key={scene.data.id}
              onClick={onClick(scene)}
            >
              {scene.data.name}
            </Button>
          ))}
        </div>
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
