import { FastifyReply, FastifyRequest } from "fastify";

import { knex } from "../../../database";

export class Metrics {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies

    const user = await knex('users')
      .where('session_id', sessionId)
      .select()

    const meals = await knex('meals')
      .where('user_id', user[0].id)
      .count({ count: '*' })
      .first()

    const mealsInDiet = await knex('meals')
      .where('user_id', user[0].id)
      .sum('within_diet', { as: 'count' })
      .first()

    // const mealsOutDiet = await knex('meals')
    //   .where('user_id', user[0].id)
    //   .where('within_diet', false)
    //   .sum('within_diet', { as: 'count' })
    //   .first()

    return { meals, mealsInDiet }
    // const dietMealsInSeguence
  }
}