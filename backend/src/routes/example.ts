import { server } from '../providers/server';
import {
  errorResponseSchema,
  exampleQuerySchema,
  exampleResponse,
  exampleResponseSchema,
} from '../schemas/schemas';
import { db } from '../providers/db';

server.get(
  '/example',
  {
    schema: {
      querystring: exampleQuerySchema,
      response: {
        200: exampleResponseSchema,
        400: errorResponseSchema,
      },
      tags: ['Example'],
    },
  },
  async (request, reply): Promise<exampleResponse> => {
    const { id, fun } = request.query;

    if (!id) {
      return reply.status(400).send({ error: 'id is required' });
    }

    return reply.status(200).send({ toto: `Hello ${id}${fun ? ` ${fun}` : ''}` });
  },
);

server.post(
  '/example',
  {
    schema: {
      querystring: exampleQuerySchema,
      response: {
        200: exampleResponseSchema,
        400: errorResponseSchema,
      },
      tags: ['Example'],
    },
  },
  async (request, reply): Promise<exampleResponse> => {
    const { id, fun } = request.query;

    if (!id) {
      return reply.status(400).send({ error: 'id is required' });
    }

    await db.user.create({
      data: {
        token: id,
        pseudo: fun ?? id,
      },
    });

    return reply.status(200).send({ toto: `Hello ${id}${fun ? ` ${fun}` : ''}` });
  },
);
