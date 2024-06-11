import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../../database";

export class GetUsers {
  async handler(request: FastifyRequest, reply: FastifyReply) {

    const users = await knex('users').select()

    return { users }
  }
}