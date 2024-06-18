import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod"

import { knex } from "../../../database";

export class CreateUser {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserBodySchema = z.object({
        name: z.string()
      })
  
      const { name } = createUserBodySchema.parse(request.body)
  
      let sessionId = request.cookies.sessionId
  
      if (!sessionId) {
        sessionId = randomUUID()
  
        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
      }
  
      // Para cada usuário criado, eu tenho um sessionId diferente.
      if (sessionId) {
        sessionId = randomUUID()
  
        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
      }
  
      await knex('users').insert({
        id: randomUUID(),
        name,
        session_id: sessionId
      })
  
      return reply.status(201).send()
    } catch (error) {
      return reply.status(500).send()
    }
  }
}