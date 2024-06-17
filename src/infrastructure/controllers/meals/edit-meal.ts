import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

import { knex } from "../../../database";

export class EditMeal {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const editMealRequestParamsSchema = z.object({
        id: z.string().uuid()
      })

      const editMealRequestBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        dateTime: z.string(),
        withinDiet: z.boolean()
      })

      const { id } = editMealRequestParamsSchema.parse(request.params)
      const {
        name,
        description,
        dateTime,
        withinDiet
      } = editMealRequestBodySchema.parse(request.body)

      const { sessionId } = request.cookies

      const user = await knex('users')
        .where('session_id', sessionId)
        .select()

      await knex('meals')
        .where('user_id', user[0].id)
        .where('id', id)
        .update({
          name,
          description,
          date_time: dateTime,
          within_diet: withinDiet
        })

      return reply.status(200).send()
    } catch (error) {
      return reply.status(500).send({ error: error })
    }

  }
}