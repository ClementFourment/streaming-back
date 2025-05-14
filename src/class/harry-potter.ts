import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';
const axios = require('axios');
import host from '../service/hosts';

export class HarryPotter {



private urls = {
    urls1: [
        `${host}/video/harry-potter?episode=1`,
        `${host}/video/harry-potter?episode=2`, //`https://sanglier.online/Harry-Potter-et-la-Chambre-des-secrets.mp4`
        `${host}/video/harry-potter?episode=3`,
        `${host}/video/harry-potter?episode=4`,
        `${host}/video/harry-potter?episode=5`,
        `${host}/video/harry-potter?episode=6`,
        `${host}/video/harry-potter?episode=7`,
        `${host}/video/harry-potter?episode=8`,
    ]
}; 


  public getNbEpisodes() {
    return this.urls.urls1.length;
  }

  public async getUrl(req: Request, res: Response, episode: number) {
    const url = [this.urls.urls1[episode - 1]];
    
    return url;
  }

//   private async extractMediaUrl(url: string): Promise<string | null> {
//     const browser = await puppeteer.launch({ headless: true });
//     let mediaUrl: string | null = null;
//     console.log(url)
//     try {
//       const page = await browser.newPage();
//       console.log(url)
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       // Supprimer les popups
//       const popupHandler = async (target: any) => {
//         if (target.type() === 'page') {
//           const popup = await target.page();
//           await popup?.close();
//         }
//       };
//       browser.on('targetcreated', popupHandler);

//       page.on('request', request => {
//         const requestUrl = request.url();
//         // 1. URL directe : .mp4 
//         if (requestUrl.match(/\.(mp4\?)/)) {
//           mediaUrl = requestUrl;
//           console.log(requestUrl)
//         }
//       });

//       await page.waitForSelector('video', { timeout: 3000 }).catch(() => {});
//       for (let i = 0; i < 5; i++) {
//         try {
//           await page.click('video');
//         } catch (_) {}
//       }

//       if (!mediaUrl) {
//         try {
//           const request = await page.waitForRequest(req => {
//             const url = req.url();
//             if (url.includes('.mp4') && url.includes('?')) {
//               return true;
//             }
//             return false;
//           }, { timeout: 3000 });
//           mediaUrl = request.url();
//         } catch (_) {}
//       }

//       return mediaUrl;
//     } catch (error) {
//       console.error(`❌ Erreur lors de l'extraction de ${url}:`, error);
//       return null;
//     } finally {
//       await browser.close();
//     }
//   }

//   public async getUrl(req: Request, res: Response, episode: number) {
//     const urls = [this.urls.urls1[episode - 1]];
//     console.log('episode', episode)
//     console.log(urls)
//     for (const url of urls) {
//       const mediaUrl = await this.extractMediaUrl(url);
//       if (mediaUrl) {
//         return mediaUrl;
//       }
//     }

//     res.status(500).json({ error: 'Aucune source vidéo détectée.' });
//     return;
//   }


  public async getThumbnails (req: Request, res: Response, episode: number) {
    // const url = await this.extractUrlThumnails(episode);
    // if (!url) {
    //   return;
    // }

    // const thumbnails = await this.getContentThumbnails(url);
    return null;
  }

  private async getContentThumbnails(url: string) {

    const response = await axios.get(url);
    const lines = response.data.split('\n');

    const thumbnails = [];

    for (let i = 0; i < lines.length; i++) {
      const timeRegex = /^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})$/;

      if (timeRegex.test(lines[i])) {
        const [, start, end] = lines[i].match(timeRegex);
        const urlLine = lines[i + 1]?.trim();

        if (urlLine && urlLine.startsWith('http')) {
          const [url, fragment] = urlLine.split('#');
          const crop = fragment?.replace('xywh=', '')?.split(',').map(Number);

          thumbnails.push({
            start,
            end,
            image: url,
            crop: {
              x: crop?.[0],
              y: crop?.[1],
              width: crop?.[2],
              height: crop?.[3],
            },
          });
        }
      }
    }
    return thumbnails;
  }

  private async extractUrlThumnails(episode: number){
    
    const url = this.urls.urls1[episode - 1];
    const browser = await puppeteer.launch({ headless: true });
    let mediaUrl: string | null = null;

    try {
      const page = await browser.newPage();
      

      // Supprimer les popups
      const popupHandler = async (target: any) => {
        if (target.type() === 'page') {
          const popup = await target.page();
          await popup?.close();
        }
      };
      browser.on('targetcreated', popupHandler);

      const requestPromise = page.waitForRequest(request =>
        request.url().includes('dl?op=get_slides'),
        { timeout: 10000 } 
      );

      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const request = await requestPromise;
      mediaUrl = request.url();

      return mediaUrl;
    } catch (error) {
      console.error(`❌ Erreur lors de l'extraction de ${url}:`, error);
      return null;
    } finally {
      await browser.close();
    }
  }
}