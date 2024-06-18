import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod"

import { knex } from "../../../database";

export class CreateMeal {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        dateTime: z.string(),
        withinDiet: z.boolean()
      })

      const {
        name,
        description,
        dateTime,
        withinDiet
      } = createMealBodySchema.parse(request.body)

      const { sessionId } = request.cookies

      const user = await knex('users')
        .where('session_id', sessionId)
        .select()

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        date_time: dateTime,
        within_diet: withinDiet,
        user_id: user[0].id
      })

      return reply.status(201).send()
    } catch (error) {
      return reply.status(500).send({ error: error })
    }
  }
}