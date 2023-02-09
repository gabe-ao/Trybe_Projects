import { Request, Response, NextFunction } from 'express';
import errorStatusMap from '../utils/errorStatusMap';

const errorToResponse = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const { message } = error;
  if (errorStatusMap[message] === undefined) {
    res.sendStatus(500);
    console.log('Error: "Internal Server Error" response caused by: \n', error);
    return;
  }
  
  res.status(errorStatusMap[message]).json({ message });
};

export default {
  errorToResponse,
};
