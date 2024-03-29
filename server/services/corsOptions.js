import options from '../config.js'

const corsOptions = {
  origin: options.clientApi,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}

export default corsOptions
