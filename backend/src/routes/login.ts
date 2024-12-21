import { server } from '@providers/server';
import {
  postUserSchema,
  postUserSchemaResponse,
  errorResponseSchema,
  userResponse,
} from '@schemas/schemas';
import { db } from '@providers/db';

server.post(
  '/login',
  {
    schema: {
      body: postUserSchema,
      response: {
        200: postUserSchemaResponse,
        400: errorResponseSchema,
      },
      tags: ['Login'],
    },
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

      if (user) {
        // update
        user = await db.user.update({
          where: { email },
          data: {
            picture,
            firstname: firstname,
            lastname: lastname,
          },
        });
      } else {
        // create
        user = await db.user.create({
          data: {
            email: email,
            picture: picture,
            firstname: firstname,
            lastname: lastname,
          },
        });
      }
      // Convert the user object to the response object (null for Prisma => undefined for Typebox)
      const res: userResponse = {
        email: user.email,
        picture: user.picture || undefined,
        firstname: user.firstname || undefined,
        lastname: user.lastname || undefined,
        id: String(user.id),
      };

      return reply.status(200).send(res);
    } catch (error) {
      return reply.status(500).send({ error: 'An error occurred' });
    }
  },
);
