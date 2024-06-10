import fastify from "fastify"
import { UserRoutes } from "./infra/routes/user-routes"

export const app = fastify()

app.register(UserRoutes)