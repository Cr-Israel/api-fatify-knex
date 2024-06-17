import { FastifyInstance } from "fastify"

import { CheckSessionIdExists } from "../../middlewares/check-session-id-exists"
import { CreateUser } from "../../controllers/users/create-user"
import { GetUsers } from "../../controllers/users/get-users"
import { GetAllUsers } from "../../controllers/users/get-all-users"

export async function UserRoutes(app: FastifyInstance) {
  // app.get('/users', new GetAllUsers().handler)
  app.post('/users', new CreateUser().handler)
  app.get('/users', { preHandler: [new CheckSessionIdExists().handler] }, new GetUsers().handler)
}