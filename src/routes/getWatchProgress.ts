import express, { Express, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth'
import { WatchProgress } from '../class/watch-progress';

module.exports = (app: Express) => {
    app.get('/get-watchprogress', authenticateToken, async (req: Request, res: Response) => {
        console.log('/get-watchprogress')
        const user = (req as any).user;
        if (!user) {
            res.sendStatus(401);
            return;
        }

        const title = req.query.title as string;
        
        if (!title || title == "") {
            res.status(400).json({ error: 'Titre et épisode de vidéo requis.' });
            return;
          }
          
        const progress = await WatchProgress.findAll({ where: { userId: user.userId, title: title } });
        res.json(progress);
        
      });
}