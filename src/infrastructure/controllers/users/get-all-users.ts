import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../../database";

export class GetAllUsers {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const users = await knex('users')
      .select()

    return users
  }
}