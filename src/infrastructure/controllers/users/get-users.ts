import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../../database";

export class GetUsers {
  async handler(request: FastifyRequest, reply: FastifyReply) {

    const { sessionId } = request.cookies

    const users = await knex('users')
      .where('session_id', sessionId)
      .select()

    return users
  }
}