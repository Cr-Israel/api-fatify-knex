import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"

import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

import { app } from "../src/app";

describe('Meals routes', () => {
  beforeAll(async () => {
    await await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('yarn knex migrate:rollback --all')
    execSync('yarn knex migrate:latest')
  })

  it('should be able to create a new meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Carlos'
      })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Frango grelhado',
        description: 'Frango grelhado com azeite',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(201)
  })

  it('should be able list all meals of user', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Carlos'
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Frango grelhado',
        description: 'Frango grelhado com azeite',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Pizza',
        description: 'Pizza Sábado a noite',
        dateTime: '30/07/2025 às 20h',
        withinDiet: false
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(mealsResponse.body.meals).toHaveLength(2)

    expect(mealsResponse.body.meals[0].name).toBe('Frango grelhado')
    expect(mealsResponse.body.meals[1].name).toBe('Pizza')
  })

  it('should be able list a specific meal from  user', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        id: randomUUID(),
        name: 'Carlos'
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Pizza',
        description: 'Pizza Sábado a noite',
        dateTime: '30/07/2025 às 20h',
        withinDiet: false
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    const mealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(mealResponse.body).toEqual({
      meal: expect.arrayContaining([
        expect.objectContaining({
          name: 'Pizza',
          description: 'Pizza Sábado a noite',
          date_time: '30/07/2025 às 20h',
          within_diet: 0
        })
      ])
    })
  })

  it('should be able to update a meal from user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Jack'
      })
      .expect(201)

    const cookies = userResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Frango grelhado',
        description: 'Frango grelhado com azeite',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .send({
        name: 'Frango com Batata',
        description: 'Frango com batata',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(204)
  })

  it('should be able to delete a meal from user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Jack'
      })
      .expect(201)

    const cookies = userResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Frango grelhado',
        description: 'Frango grelhado com azeite',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(201)

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = mealsResponse.body.meals[0].id

    request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(204)
  })

  it('should be able to get metrics from a user', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe'
      })
      .expect(201)

    const cookies = userResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Frango grelhado',
        description: 'Frango grelhado com azeite',
        dateTime: '20/07/2025 às 12h',
        withinDiet: true
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Batata Frita',
        description: 'Batata Frita com Bacon',
        dateTime: '30/07/2025 às 20h',
        withinDiet: false
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Salada',
        description: 'Salada',
        dateTime: '01/09/2025 às 15h',
        withinDiet: true
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Pizza',
        description: 'Pizza',
        dateTime: '05/09/2025 às 19h',
        withinDiet: false
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Pizza',
        description: 'Pizza Domingo a noite',
        dateTime: '09/09/2025 às 20h',
        withinDiet: false
      })
      .expect(201)

    const metricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies)
      .expect(200)

    expect(metricsResponse.body).toEqual({
      allMeals: expect.objectContaining({
        "count": 5
      }),
      mealsInDiet: expect.objectContaining({
        "count": 2
      }),
      mealsOutDiet: expect.objectContaining({
        "count": 3
      }),
      dietMealsInSeguence: expect.objectContaining({
        "name": "Pizza",
        "count": 2
      }),
    })
  })
})