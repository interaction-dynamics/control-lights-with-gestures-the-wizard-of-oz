import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { v3, discovery } from 'node-hue-api'
import dotenv from 'dotenv'

const {
  api: hueApi,
  lightStates: { GroupLightState, LightState },
} = v3

dotenv.config()

let api = null
let room = null
let lights = []
let scenes = []

const start = async () => {
  const discoveryResults = await discovery.nupnpSearch()
  const ipAddress = discoveryResults[0].ipaddress

  api = await hueApi.createLocal(ipAddress).connect(process.env.hue_username)
  const groups = await api.groups.getGroupByName(process.env.room)

  room = groups[0] || null
  const allLights = await api.lights.getAll()
  lights = allLights.filter(l => room.data.lights.includes(`${l.data.id}`))

  const allScenes = await api.scenes.getAll()

  scenes = allScenes.filter(
    s =>
      process.env.scenes
        .replace(/\s/g, '')
        .toLowerCase()
        .split(',')
        .includes(s.data.name.toLowerCase()) && s.data.group === `${room.id}`
  )
}

const app = express()
app.use(bodyParser.text({ type: 'text/plain' }))

/* CORS */
// app.use(cors()); // Enable cors for all origins
app.use(
  cors({
    /** Use this when web frontend / production * */
    // origin: 'https://example.com',

    /** Use this when local frontend / development * */
    origin: 'http://localhost:8000',
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', async (req, res) => {
  const groups = await api.groups.getGroupByName('Living room')

  res.send(groups)
})

app.get('/api/lights', async (req, res) => {
  res.send(lights)
})

app.get('/api/scenes', async (req, res) => {
  res.send(scenes)
})

app.put('/api/scenes/:sceneId', async (req, res) => {
  try {
    const newLightState = new GroupLightState().scene(req.params.sceneId)

    await api.groups.setGroupState(room.id, newLightState)

    return res.send({ success: true })
  } catch (e) {
    return res.send({ error: e.message })
  }
})

const updateBrightness = async (lightId, brightness) => {
  const newLightState = new LightState()
    .on(brightness > 0)
    .brightness(brightness)
    .transitionInstant()

  await api.lights.setLightState(lightId, newLightState)
}

app.put('/api/lights/brightness/:value', async (req, res) => {
  try {
    const brightness = parseInt(req.params.value, 10)

    await Promise.all(lights.map(l => updateBrightness(l.data.id, brightness)))

    return res.send({ success: true })
  } catch (e) {
    return res.send({ error: e.message })
  }
})

app.put('/api/lights/:id/brightness/:value', async (req, res) => {
  const brightness = parseInt(req.params.value, 10)

  try {
    await updateBrightness(req.params.id, brightness)

    return res.send({ success: true })
  } catch (e) {
    return res.send({ error: e.message })
  }
})

const updateBrightnessFast = async (lightId, brightness) => {
  const newLightState = new LightState()
    .on(brightness > 0)
    .brightness(brightness)
    .transitionFast(500)

  await api.lights.setLightState(lightId, newLightState)
}

const blinkBrightness = async lightId => {
  const selectedLight = await api.lights.getLight(parseInt(lightId, 10))

  const brightness = selectedLight.data.state.on
    ? (selectedLight.data.state.bri / 254) * 100
    : 0

  const temporaryScene = brightness > 50 ? brightness * 0.5 : brightness * 1.75

  await updateBrightnessFast(lightId, temporaryScene)
  await new Promise(resolve => setTimeout(resolve, 600))
  await updateBrightnessFast(lightId, brightness)
}

app.put('/api/lights/selection', async (req, res) => {
  try {
    await Promise.all(lights.map(l => blinkBrightness(l.data.id)))
    return res.send({ success: true })
  } catch (e) {
    return res.send({ error: e.message })
  }
})

app.put('/api/lights/:id/selection', async (req, res) => {
  try {
    await blinkBrightness(req.params.id)
    return res.send({ success: true })
  } catch (e) {
    return res.send({ error: e.message })
  }
})

app.listen(8080)

start()
