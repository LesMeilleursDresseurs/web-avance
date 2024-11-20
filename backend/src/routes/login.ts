import { server } from '../providers/server';
import {
  postUserSchema,
  postUserSchemaResponse,
  errorResponseSchema,
} from '../schemas/schemas';
import { db } from '../providers/db';

server.post(
  '/login',
  {
    schema: {
      body: postUserSchema, // Changez ici pour `body`
      response: {
        200: postUserSchemaResponse,
        400: errorResponseSchema,
      },
      tags: ['Login'],
    }
  },
  async (request, reply): Promise<userResponse> => {
    const { email, picture, firstname, lastname } = request.body; // Changez ici pour `body`

    if (!email) {
      return reply.status(400).send({ error: 'email is required' });
    }

    try {
      let user = await db.user.findUnique({
        where: { email },
      });

      if (user) { // update
        user = await db.user.update({
          where: { email },
          data: {
            picture,
            firstname: firstname,
            lastname: lastname,
          },
        });
      } else { // create
        user = await db.user.create({
          data: {
            email: email,
            picture: picture,
            firstname: firstname,
            lastname: lastname,
          },
        });
      }
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(500).send({ error: 'An error occurred' });
    }
  }
);

