import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import options from './config.js'
import corsOptions from './services/corsOptions.js'
import connectDB from './services/mongoose.js'
import jwtStrategy from './services/passport.js'
import User from './models/User.model.js'

if (options.isDB) {
  connectDB()
}

const serverPort = options.port || 8080
const server = express()
const __dirname = process.cwd()
const httpServer = http.createServer(server)
const io = new Server(httpServer, { cors: corsOptions })
let WSConnections = []

const middleware = [
  cors(corsOptions),
  passport.initialize(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist'))
]

passport.use('jwt', jwtStrategy)

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

const serverListen = httpServer.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})

if (options.isSocked) {
  io.on('connection', async (socket) => {
    const { token } = socket.handshake.auth
    const jwtUser = jwt.verify(token, options.secret)

    const user = await User.findById(jwtUser.uid)
    console.log(`${user.name} connected, id:${socket.id}`)
    WSConnections.push(user.name)

    socket.on('disconnect', () => {
      WSConnections = WSConnections.filter((it) => it !== user.email)
      console.log(`${user.email} disconnected`)
    })
  })
}
