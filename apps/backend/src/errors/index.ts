//------------------------------------------------
// CUSTOM ERROR HANDLING
//------------------------------------------------

import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HTTPSTATUS } from '@/configs/http-config';
import { ErrorCode } from '@/enums/error-code';
import { AppError } from '@/errors/app-error';
import { formatZodError } from '@/errors/formater';
import { createLogger } from '@/utils/loger';

const logger = createLogger();

interface ErrorResponse {
  message: string;
  stack?: string;
  status?: number;
  code?: string;
}

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  const error = new AppError(`${ErrorCode.NOT_FOUND} - ${req.originalUrl}`, HTTPSTATUS.NOT_FOUND);
  next(error);
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(`Error Occured on ${req.method} ${req.originalUrl}: ${err.message}`, err);
  if (err instanceof SyntaxError) {
    res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid request body',
    });
    return;
  }
  if (err instanceof z.ZodError) {
    formatZodError(res, err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
    return;
  }

  res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV !== 'production' ? err.message : undefined,
  });
};
export type { ErrorResponse };
