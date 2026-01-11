import { ZodError } from 'zod';

export default class AppError {
  protected message: string | ZodError[] = '';
  protected statusCode: number = 500;

  constructor(message: string | ZodError[], statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
