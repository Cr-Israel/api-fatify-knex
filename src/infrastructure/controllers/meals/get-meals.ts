import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../../database";

export class GetMeals {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sessionId } = request.cookies

      const user = await knex('users')
        .where('session_id', sessionId)
        .select()

      const meals = await knex('meals')
        .where('user_id', user[0].id)
        .select()

      return { meals }
    } catch (error) {
      return reply.status(500).send({ error: error })
    }
  }
}