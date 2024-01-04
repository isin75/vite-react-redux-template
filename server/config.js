import dotenv from 'dotenv'

dotenv.config()

const options = {
  port: process.env.PORT,
  clientApi: process.env.CLIENT_API,
  isSocket: process.env.IS_SOCKET
}

export default options
