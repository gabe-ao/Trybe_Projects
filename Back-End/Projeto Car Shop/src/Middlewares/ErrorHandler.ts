import { Request, Response, NextFunction } from 'express';
import errorMap from '../Utils/errorMap';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { message } = error;
    if (message.includes('{"type":') && message.includes(',"message":')) {
      const contract = JSON.parse(message);
      res.status(errorMap(contract.type)).json({ message: contract.message });
      return;
    }    
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
}

export default ErrorHandler;