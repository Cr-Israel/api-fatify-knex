import { FastifyInstance } from "fastify"

import { CreateUser } from "../../controllers/users/create-user"
import { GetUsers } from "../../controllers/users/get-users"
import { CheckSessionIdExists } from "../../middlewares/check-session-id-exists"

export async function UserRoutes(app: FastifyInstance) {
  app.post('/users', new CreateUser().handler)
  app.get('/users', { preHandler: [new CheckSessionIdExists().handler] }, new GetUsers().handler)
}
