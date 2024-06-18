import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../../database";

export class GetAllUsers {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await knex('users')
        .select()

      return users
    } catch (error) {
      return reply.status(500).send()
    }
  }
}