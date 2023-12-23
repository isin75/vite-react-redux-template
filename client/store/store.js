import { configureStore } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import rootReducer from './reducers/rootReducer'

const store = configureStore({
  reducer: rootReducer
})

const socket = io('/')
socket.on('connection', () => {
  console.log('client hi')
})

export default store
