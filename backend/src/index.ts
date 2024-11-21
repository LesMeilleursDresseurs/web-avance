import { configurePlugins, server } from './providers/server';

const { SERVER_PORT = 3000, SERVER_HOST = 'localhost' } = process.env;

const main = async () => {
  try {
    await configurePlugins();

    await Promise.all([
      await import('./routes/example'),
      await import('./routes/login'),
      await import('./routes/cardCollection'),
    ]);

    await server.listen({
      port: Number(SERVER_PORT),
      host: SERVER_HOST,
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

main().catch(console.error);
