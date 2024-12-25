import { server } from '../providers/server';
import {
  errorResponseSchema,
  cardQuerySchema,
  cardResponseSchema,
  cardResponse,
  getCardsQuerySchema,
  getCardsResponseSchema,
  getCardResponse,
} from '../schemas/schemas';
import { db } from '../providers/db';

import { Type as t } from '@sinclair/typebox';

server.get(
  '/getCards',
  {
    schema: {
      querystring: t.Object({
        userId: t.Integer(),
      }),
      response: {
        200: t.Object({
          message: t.String(),
          cards: t.Array(
            t.Object({
              id: t.String(),
              localId: t.String(),
              name: t.String(),
              image: t.String(),
            })
          ),
        }),
        400: t.Object({
          error: t.String(),
        }),
      },
      tags: ['CardCollection'],
    },
  },
  async (request, response) => {
    const { userId } = request.query;

    if (!userId) {
      return response.status(400).send({ error: 'userId is required' });
    }

    const cards = await db.cardCollection.findMany({
      where: {
        idUser: userId,
      },
    });

    if (cards.length === 0) {
      return response.status(200).send({ message: `No cards found`, cards: [] });
    }

    return response.status(200).send({
      message: `Cards found`,
      cards: cards.map(({ idCard, localId, name, image }) => ({
        id: idCard,
        localId,
        name,
        image,
      })),
    });
  }
);


server.post(
  '/addCard',
  {
    schema: {
      body: t.Object({
        idUser: t.Integer(),
        id: t.String(),
        localId: t.String(),
        name: t.String(),
        image: t.String(),
      }),
      response: {
        200: cardResponseSchema,
        400: errorResponseSchema,
      },
      tags: ['CardCollection'],
    },
  },
  async (request, response): Promise<cardResponse> => {
    const { idUser, id, localId, name, image } = request.body;

    if (!idUser || !id || !name || !image) {
      return response.status(400).send({ error: 'Missing required fields' });
    }

    await db.cardCollection.create({
      data: {
        idUser,
        idCard: id,
        localId,
        name,
        image,
      },
    });

    return response.status(200).send({ message: `Card added to collection` });
  }
);

server.delete(
  '/deleteCard',
  {
    schema: {
      querystring: cardQuerySchema,
      response: {
        200: cardResponseSchema,
        400: errorResponseSchema,
      },
      tags: ['CardCollection'],
    },
  },
  async (request, response): Promise<cardResponse> => {
    const { cardId, userId } = request.query;

    if (!cardId) {
      return response.status(400).send({ error: 'cardId is required' });
    }

    if (!userId) {
      return response.status(400).send({ error: 'userId is required' });
    }

    const deletedCard = await db.cardCollection.delete({
      where: {
        idCard_idUser: {
          idCard: cardId,
          idUser: userId,
        },
      },
    });

    return response.status(200).send({ message: `Card removed from collection` });
  }
);
