import dotenv from 'dotenv'

dotenv.config()

const config = {
  ioSocket: process.env.IO_API,
  api: process.env.API,
  isSocket: process.env.IS_SOCKET
}

export default config
