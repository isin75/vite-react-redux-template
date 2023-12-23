import express from 'express'
import { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

import options from './config.js'

const serverPort = options.port || 8080
const server = express()
const __dirname = process.cwd()
const httpServer = http.createServer(server)
const io = new Server(httpServer)
const WSConnections = []

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, 'dist'))
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

io.on('connection', (socket) => {
  // const user = getUserByToken(socket.handshake.auth.token)
  // socket.userId = user.id
  WSConnections.push(socket)
  console.log('user connection')
  socket.on('disconnect', () => {
    WSConnections.filter((it) => it !== socket)
    console.log('user disconnected')
  })
})

const serverListen = httpServer.listen(serverPort, () => {
  const { port } = serverListen.address()
  console.log(`Server is running on port http://localhost:${port}/`)
})
