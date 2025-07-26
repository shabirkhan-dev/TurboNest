import { HTTPSTATUS, type HttpStatusCode } from '@/configs/http-config';
import { ErrorCode } from '@/enums/error-code';
import { AppError } from '@/errors/app-error';

export class NotFoundException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.NOT_FOUND) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.VALIDATION_ERROR) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.AUTH_UNAUTHORIZED_ACCESS) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
  }
}

export class ForbiddenException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.ACCESS_FORBIDDEN) {
    super(message, HTTPSTATUS.FORBIDDEN, errorCode);
  }
}

export class ConflictException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.VALIDATION_ERROR) {
    super(message, HTTPSTATUS.CONFLICT, errorCode);
  }
}

export class TooManyRequestsException extends AppError {
  constructor(message: string, errorCode: ErrorCode = ErrorCode.AUTH_TOO_MANY_ATTEMPTS) {
    super(message, HTTPSTATUS.TOO_MANY_REQUESTS, errorCode);
  }
}
