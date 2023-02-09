import { Request, Response, NextFunction } from 'express';
import errorMap from '../utils/errorMap';

function errorController(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  const { message } = error;
  if (message.includes('{"type":') && message.includes(',"message":')) {
    const contract = JSON.parse(message);
    res.status(errorMap(contract.type)).json({ message: contract.message });
    return;
  }

  console.log('Error: Internal Server Error response caused by: \n', error);
  res.sendStatus(500);
}

export default errorController;
