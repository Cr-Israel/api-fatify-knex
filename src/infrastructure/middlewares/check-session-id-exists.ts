import { FastifyReply, FastifyRequest } from "fastify";

export class CheckSessionIdExists {
  async handler(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply.status(401).send({
        error: 'Unathorized'
      })
    }
  }
}