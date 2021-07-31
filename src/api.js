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

const start = async () => {
  const discoveryResults = await discovery.nupnpSearch()
  const ipAddress = discoveryResults[0].ipaddress

  api = await hueApi.createLocal(ipAddress).connect(process.env.hue_username)
  const groups = await api.groups.getGroupByName(process.env.room)

  room = groups[0] || null
  const allLights = await api.lights.getAll()
  lights = allLights.filter(l => room.data.lights.includes(`${l.data.id}`))
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

const findAllLights = async () =>
  lights.filter(l => room.data.lights.includes(`${l.data.id}`))

app.get('/api/lights', async (req, res) => {
  res.send(lights)
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

app.listen(8080)

start()
