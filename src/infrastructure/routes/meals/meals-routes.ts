import { FastifyInstance } from "fastify"

import { CheckSessionIdExists } from "../../middlewares/check-session-id-exists"

import { CreateMeal } from "../../controllers/meals/create-meal"
import { GetMeals } from "../../controllers/meals/get-meals"
import { EditMeal } from "../../controllers/meals/edit-meal"
import { DeleteMeal } from "../../controllers/meals/delete-meal"
import { GetMealById } from "../../controllers/meals/get-meal-by-id"
import { Metrics } from "../../controllers/meals/metrics-meals"

export async function MealsRoutes(app: FastifyInstance) {
  app.post('/meals', { preHandler: [new CheckSessionIdExists().handler] }, new CreateMeal().handler)
  app.get('/meals', { preHandler: [new CheckSessionIdExists().handler] }, new GetMeals().handler)
  app.patch('/meals/:id', { preHandler: [new CheckSessionIdExists().handler] }, new EditMeal().handler)
  app.delete('/meals/:id', { preHandler: [new CheckSessionIdExists().handler] }, new DeleteMeal().handler)
  app.get('/meals/:id', { preHandler: [new CheckSessionIdExists().handler] }, new GetMealById().handler)
  app.get('/meals/metrics', { preHandler: [new CheckSessionIdExists().handler] }, new Metrics().handler)
}
