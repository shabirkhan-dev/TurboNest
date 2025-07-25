import cors from 'cors';
import express from 'express';
import { config } from '@/configs/env-config';
import { errorHandler, notFound } from '@/errors';
import AuthRoute from '@/modules/auth/routes/auth';
import { createHttpLogger, createLogger } from '@/utils/loger';

const logger = createLogger('Server');
const httpLogger = createHttpLogger(logger);
export const app = express();

// ┌──────────────────────────────────────────┐
//│            Middlewares                   │
//└─────────────────────────────────────────┘
app.use(httpLogger);
app.use(
  cors({
    credentials: true,
    origin: config.APP_ORIGIN,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ℹ️ Routes will be added here
app.get('/health', (_req, res) => {
  res.send('OK');
});
app.use('/api/auth', AuthRoute);

app.use(notFound);
app.use(errorHandler);
