import { app } from "../../app";
import { env } from "../../env"

const server = app

server.listen({
  port: env.PORT
}).then(() => {
  console.log('HTTP server running!')
}).catch((error) => {
  throw new Error(`Error here: ${error}`)
})