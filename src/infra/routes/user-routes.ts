import { FastifyInstance } from "fastify"
import { CreateUser } from "../controllers/create-user"
import { GetUsers } from "../controllers/get-users"

export async function UserRoutes(app: FastifyInstance) {
  app.post('/users', new CreateUser().handler)
  app.get('/users', new GetUsers().handler)
}
