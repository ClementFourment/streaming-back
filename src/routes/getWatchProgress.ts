import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';
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
        
        const progress = await WatchProgress.findAll({ where: { userId: user.userId, title: title } });
        res.json(progress);
        
      });
}