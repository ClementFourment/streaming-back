import express, { Express, Request, Response } from 'express';
import sources from '../service/sources';
import { IncomingMessage } from "http";
import * as https from "https";


module.exports = (app: Express) => {
    app.get('/video/age-de-glace', async (req: Request, res: Response) => {
        res.setHeader('ngrok-skip-browser-warning', 'true');
        console.log('oui on get get')
        const episode = req.query.episode as string;
        if (!episode || episode == "") {
          res.status(400).json({ error: 'Episode de vidéo requis.' });
          return;
        }
        
        
        const videoUrls = [
            "https://sanglier.online/Lage-De-Glace.mp4",
            "https://sanglier.online/Lage-De-Glace-2.mp4",
            "https://sanglier.online/Lage-De-Glace-3-Le-Temps-Des-Dinosaures.mp4",
            "https://sanglier.online/Ice_Age_Continental_Drift_2012.mp4",
            "https://sanglier.online/The.Ice.Age.Adventures.of.Buck.Wild.2022.mp4"
        ];


        const range = req.headers.range;

        if (!range) {
            res.status(416).send("Range header is required");
            return;
        }

        const options = {
            headers: {
            "Range": range,
            "Referer": "https://xalaflix.io/",
            "User-Agent": req.headers["user-agent"] || "",
            "ngrok-skip-browser-warning": "true"
            },
            agent: new https.Agent({ keepAlive: true })
        };
        
        
        https.get(videoUrls[(+episode) - 1], options, (streamRes) => {
            const contentType = streamRes.headers["content-type"] || "video/mp4";

            res.writeHead(streamRes.statusCode || 206, {
                ...streamRes.headers,
                "Content-Type": "video/mp4",
                "Accept-Ranges": "bytes",
                "Access-Control-Allow-Origin": "*"              
            });
            streamRes.pipe(res);
        }).on("error", (err) => {
            res.status(500).send("Erreur vidéo : " + err.message);
        });
        
        
      });
}