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

server.get(
  '/getCards',
  {
    schema: {
      querystring: getCardsQuerySchema,
      response: {
        200: getCardsResponseSchema,
        400: errorResponseSchema,
      },
      tags: ['CardCollection'],
    },
  },
  async (request, response): Promise<getCardResponse> => {
    const { userId } = request.query;

    if (!userId) {
      return response.status(400).send({ error: 'userId is required' });
    }
    console.log('test userId ', userId);
    const cards = await db.cardCollection.findMany({
      where: {
        idUser: userId,
      },
    });
    console.log('test cards ', cards);

    if (cards.length === 0) {
      return response.status(200).send({ message: `No cards found`, cards });
    }
    const cardsIds = cards.map((card) => card.idCard);
    return response.status(200).send({ message: `Cards found`, cards: cardsIds });
  }
);

server.post(
  '/addCard',
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

    await db.cardCollection.create({
      data: {
        idCard: cardId,
        idUser: userId,
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
