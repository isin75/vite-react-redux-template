import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  clientApi: process.env.CLIENT_API,
  isSocket: process.env.IS_SOCKET,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.SECRET,
  isDB: process.env.IS_DB
}

export default options
