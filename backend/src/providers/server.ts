import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import cors from '@fastify/cors';

export const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

export const configurePlugins = async () => {
  await server.register(fastifySwagger, {
    swagger: {
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        {
          name: 'Example',
          description: 'Example end-points',
        },
        {
          name: 'Login',
          description: 'User authentification end-points',
        },
        {
          name: 'CardCollection',
          description: 'Card collection end-points',
        },
      ],
    },
  });
  await server.register(cors);
  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
};
