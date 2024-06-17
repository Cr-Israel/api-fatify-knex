import fastify from "fastify"
import cookie from "@fastify/cookie"

import { UserRoutes } from "./infrastructure/routes/users/users-routes"
import { MealsRoutes } from "./infrastructure/routes/meals/meals-routes"

export const app = fastify()

app.register(cookie)

app.register(UserRoutes)
app.register(MealsRoutes)