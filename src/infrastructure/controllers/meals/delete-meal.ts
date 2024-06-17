import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

import { knex } from "../../../database";

export class DeleteMeal {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const editMealRequestParamsSchema = z.object({
        id: z.string().uuid()
      })

      const { id } = editMealRequestParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const user = await knex('users')
        .where('session_id', sessionId)
        .select()

      await knex('meals')
        .where('user_id', user[0].id)
        .where('id', id)
        .del()
        
      return reply.status(200).send()
    } catch (error) {
      return reply.status(500).send({ error: error })
    }

  }
}