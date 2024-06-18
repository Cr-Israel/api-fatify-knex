import { FastifyReply, FastifyRequest } from "fastify";

import { knex } from "../../../database";

export class Metrics {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies

    const user = await knex('users')
      .where('session_id', sessionId)
      .select()

    const allMeals = await knex('meals')
      .where('user_id', user[0].id)
      .count({ count: '*' })
      .first()

    const mealsInDiet = await knex('meals')
      .where('user_id', user[0].id)
      .where('within_diet', true)
      .count({ count: '*' })
      .first()

    const mealsOutDiet = await knex('meals')
      .where('user_id', user[0].id)
      .where('within_diet', false)
      .count({ count: '*' })
      .first()

    const dietMealsInSeguence = await knex('meals')
      .where('user_id', user[0].id)
      .select('name')
      .count('name as count')
      .groupBy('name')
      .orderBy('count', 'desc')
      .first();

    return { allMeals, mealsInDiet, mealsOutDiet, dietMealsInSeguence }
  }
}