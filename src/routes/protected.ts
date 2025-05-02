import express, { Express, Request, Response } from 'express';
import JWT_SECRET from '../service/jwt';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.get('/protected', (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ message: 'Accès non autorisé' });
      return;
    }
  
    jwt.verify(token, JWT_SECRET, (err: Error | null, decoded: {userId: number, username: string} | undefined) => {
      if (err) {
        res.status(401).json({ message: 'Token invalide' });
        return;
      }
      res.json({ message: 'Accès autorisé', user: decoded });
    });
  });
}