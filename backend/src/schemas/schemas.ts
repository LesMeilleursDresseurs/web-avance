import { Static, Type as t } from '@sinclair/typebox';

export const errorResponseSchema = t.Object({ error: t.String() });

export const postUserSchema = t.Object({
  email: t.String(),
  picture: t.Optional(t.String()),
  firstname: t.Optional(t.String()),
  lastname: t.Optional(t.String()),
});

export const postUserSchemaResponse = t.Object({
  id: t.String(),
  email: t.String(),
  lastname: t.Optional(t.String()),
  picture: t.Optional(t.String()),
  firstname: t.Optional(t.String()),
});

export type userResponse = Static<typeof postUserSchemaResponse>;

export const cardQuerySchema = t.Object({
  userId: t.Integer(),
  cardId: t.String(),
});
export const getCardsQuerySchema = t.Object({
  userId: t.Integer(),
});
export const cardResponseSchema = t.Object({
  message: t.String(),
});

export const addCardBodySchema = t.Object({
  idUser: t.Integer(),
  id: t.String(),
  localId: t.String(),
  name: t.String(),
  image: t.String(),
});

export const getCardsResponseSchema = t.Object({
  message: t.String(),
  cards: t.Array(
    t.Object({
      id: t.String(),
      localId: t.String(),
      name: t.String(),
      image: t.String(),
    })
  ),
});


export type cardResponse = Static<typeof cardResponseSchema>;
export type getCardResponse = Static<typeof getCardsResponseSchema>;
