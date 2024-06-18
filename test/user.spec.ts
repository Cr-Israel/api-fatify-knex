import { afterAll, beforeAll, beforeEach, describe, it } from "vitest"
import request from "supertest"

import { execSync } from "node:child_process";

import { app } from "../src/app";

describe('Users routes', () => {
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

  it('should be able to create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Israel'
      })
      .expect(201)
  })

  it('should be able list a user', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Israel'
      })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .get('/users')
      .set('Cookie', cookies)
      .expect(200)
  })

  it('should be able list all users without cookie', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Israel'
      })

    await request(app.server)
      .post('/users')
      .send({
        name: 'Carlos'
      })

    await request(app.server)
      .get('/all-users')
      .expect(200)
  })
})