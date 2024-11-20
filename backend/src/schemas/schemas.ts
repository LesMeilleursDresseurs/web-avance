import { Static, Type as t } from '@sinclair/typebox';

export const errorResponseSchema = t.Object({ error: t.String() });

export const exampleQuerySchema = t.Object({
  id: t.String(),
  fun: t.Optional(t.String()),
});

export const exampleResponseSchema = t.Object({
  toto: t.String(),
});

export type exampleResponse = Static<typeof exampleResponseSchema>;
