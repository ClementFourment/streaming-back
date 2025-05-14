import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';


module.exports = (app: Express) => {
    app.get('/get-thumbnails', async (req: Request, res: Response) => {

        const title = req.query.title as string;
        const episode = req.query.episode as string;
      
        if (!title || title == "" || !episode || episode == "") {
          res.status(400).json({ error: 'Titre et épisode de vidéo requis.' });
          return;
        }
        const sourceFound = sources.find(source => source.title === title);
        if (!sourceFound || !sourceFound.src) {
          res.status(400).json({ error: 'Titre non trouvé.' });
          return;
        }
        
        const classe = new sourceFound.src();
      
        try {
          const thumbnails = await classe.getThumbnails(req, res, +episode);
          res.json({ thumbnails });
        } catch (error) {
          console.error('Erreur dans getUrl:', error);
          res.status(500).json({ error: 'Erreur serveur.' });
        }
        
      });
}