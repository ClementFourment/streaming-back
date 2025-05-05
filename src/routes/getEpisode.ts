import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';
import { authenticateToken } from '../middleware/auth';
import { WatchProgress } from '../class/watch-progress';


module.exports = (app: Express) => {
    app.get('/get-episode', authenticateToken, async (req: Request, res: Response) => {
        console.log("/get-episode")
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
        const episode = progress[0].episodeNumber;
        console.log(episode)
        res.json({episode});
      });
}