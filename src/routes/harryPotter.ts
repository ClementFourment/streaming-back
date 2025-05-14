import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';
import { IncomingMessage } from "http";
import * as https from "https";


module.exports = (app: Express) => {
    app.get('/video/harry-potter', async (req: Request, res: Response) => {

        const episode = req.query.episode as string;
        console.log("ep", episode)
        if (!episode || episode == "") {
          res.status(400).json({ error: 'Episode de vidéo requis.' });
          return;
        }
        
        
        const videoUrls = [
            "https://sanglier.online/Harry-Potter-a-l&#039;ecole-des-sorciers.mp4",
            "https://sanglier.online/Harry-Potter-et-la-Chambre-des-secrets.mp4",
            "https://sanglier.online/Harry-Potter-et-le-Prisonnier-d'Azkaban.mp4",
            "https://sanglier.online/Harry-Potter-et-la-Coupe-de-feu.mp4",
            "https://sanglier.online/Harry-Potter-et-l&#039;Ordre-du-Phenix.mp4",
            "https://sanglier.online/Harry-Potter-et-le-Prince-de-sang-mele.mp4",
            "https://sanglier.online/Harry-Potter-et-les-Reliques-de-la-mort-1ere-partie.mp4",
            "https://sanglier.online/Harry-Potter-et-les-Reliques-de-la-mort-2eme-partie.mp4"
        ];
        const range = req.headers.range || "bytes=0-";
        const options = {
            headers: {
            "Range": range,
            "Referer": "https://xalaflix.io/",
            "User-Agent": req.headers["user-agent"]
            },
            agent: new https.Agent({ keepAlive: true })
        };
        https.get(videoUrls[+episode], options, (streamRes: IncomingMessage) => {
            res.writeHead(streamRes.statusCode || 200, streamRes.headers);
            streamRes.pipe(res);
        }).on("error", (err: Error) => {
            res.status(500).send("Erreur proxy vidéo: " + err.message);
        });
        
        
      });
}