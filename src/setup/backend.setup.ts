import { json as bodyParserJSON } from 'body-parser';
import { MESSAGES } from 'consts';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import { Server } from 'socket.io'
import { errorHandlerMiddleware, requestLoggerMiddleware } from 'middlewares';
import appRoutes from 'routes';
import { ROUTE_VERSION } from 'config';
import { socketServer } from 'utils/socket';

const port = process.env.PORT || 8000;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  app.use(requestLoggerMiddleware);

  // Health check
  app.use('/health', function (req, res) {
    res.send('OK');
  });

  // check all env variables are set.
  app.use('/env-check', function (req, res) {
    if (!process.env.PORT) {
      res.send('Port number is not set.');
    }

    if (!process.env.DB_HOST) {
      res.send('Database host address is not set.');
    }

    if (!process.env.DB_USERNAME) {
      res.send('Database connection user name is not set.');
    }

    if (!process.env.DB_PASSWORD) {
      res.send('Database connection password is not set.');
    }

    if (!process.env.DB_PORT) {
      res.send('Database connection port number is not set.');
    }

    if (!process.env.DB_NAME) {
      res.send('Database name is not set.');
    }

    if (!process.env.EMAIL_SERVICE_ENDPOINT) {
      res.send('Email service endpoint is not set.');
    }

    if (!process.env.ISSUER_NODE_IDENTIFIER_ENDPOINT) {
      res.send('Create identifier endpoint from issuer node is not set.');
    }

    if (!process.env.CREATE_IDENTIFIER_TOKEN) {
      res.send('Create identifier token is not set.');
    }

    res.send('All env variables are set.');
  });

  app.use(`/api/${ROUTE_VERSION}`, appRoutes);

  app.use(errorHandlerMiddleware);

  const server = app.listen(port, () => {
    console.info(MESSAGES.SERVER_RUN_SUCCESS);
  });

  socketServer.startServer(server);
};

export default backendSetup;
