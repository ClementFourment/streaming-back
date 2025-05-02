const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import JWT_SECRET from '../service/jwt';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: Error, user: any) => {
    if (err) {
        res.sendStatus(403);
        return;
    }
    (req as any).user = user;
    
    next();
  });
};
