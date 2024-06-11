import fastify from "fastify"
import cookie from "@fastify/cookie"

import { UserRoutes } from "./infrastructure/routes/user-routes"

export const app = fastify()

app.register(cookie)

app.register(UserRoutes)