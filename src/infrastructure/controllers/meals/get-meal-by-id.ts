import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

import { knex } from "../../../database";

export class GetMealById {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const editMealRequestParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = editMealRequestParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const user = await knex('users')
      .where('session_id', sessionId)
      .select()

    const meal = await knex('meals')
      .where('user_id', user[0].id)
      .where('id', id)
      .select()

    return { meal }
  }
}