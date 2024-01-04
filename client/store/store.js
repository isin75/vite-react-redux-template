import { configureStore } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import rootReducer from './reducers/rootReducer'
import config from '../config'

const store = configureStore({
  reducer: rootReducer
})

let socket

export const createSocket = (token) => {
  socket = io(config.ioSocket, {
    reconnection: true,
    reconnectionDelay: 500,
    autoConnect: true,
    reconnectionAttempts: 50,
    auth: {
      token
    }
  })

  socket.on('data', (data) => {
    return data
  })
}

// eslint-disable-next-line consistent-return
export const getSocket = () => {
  if (config.isSocket) {
    return socket
  }
}

export default store
