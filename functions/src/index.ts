import * as functions from "firebase-functions";
import axios from "axios";
import {JSDOM} from "jsdom";

/* tslint:disable:max-line-length */

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getOgpFromExternalWebsite = functions.https.onRequest(async (request, response) => {
  const targetUrls = extractUrlParams(request, response);

  if (!targetUrls) return;

  const ogps: any = {};

  // リクエストで渡されたURLごとにOGPを取得
  await Promise.all(
    targetUrls.map(async (targetUrl: string) => {
      const encodedUri = encodeURI(targetUrl);
      const headers = {"User-Agent":"bot"};
      
      try {
          const res = await axios.get(encodedUri, { headers: headers });
          const html = res.data;
          const dom = new JSDOM(html);
          const meta = dom.window.document.head.querySelectorAll("meta");
          const ogp = extractOgp([...meta]);

        // URLをキーとして、取得したOGPをまとめて返す
        ogps[targetUrl] = ogp;
      } catch (error) {
          console.error(error);
          sendErrorResponse(response, error);
      }
    }));

    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type, authorization');

  response.status(200).json(ogps);
})


// リクエストからOGPを取得しに行くURLを抽出
function extractUrlParams(request: functions.https.Request, response: functions.Response<any>): string[] {
  const url = request.query.url;
  const urls = request.query.urls;

  if (url && urls) {
    sendErrorResponse(response, "Request query can't have both 'url' and 'urls'");
    return [];
  } else if (url) {
    if (Array.isArray(url)) {
      sendErrorResponse(response, "'url' must be string");
      return [];
    }
    return [<string>url];
  } else if (urls) {
    if (!Array.isArray(urls)) {
      sendErrorResponse(response, "'urls' must be array of string");
      return [];
    }
    return <string[]>urls;
  } else {
    sendErrorResponse(response, "Either 'url' or 'urls' must be included");
    return [];
  }
}


// HTMLのmetaタグからogpを抽出
function extractOgp(metaElements: HTMLMetaElement[]): any {
  const ogp = metaElements
    .filter((element: Element) => element.hasAttribute("property"))
    .reduce((previous: any, current: Element) => {
      const property = current.getAttribute("property")?.trim();
      if (!property) return;
      const content = current.getAttribute("content");
      previous[property] = content;
      return previous;
    }, {});

  return ogp;
}


function sendErrorResponse(response: functions.Response<any>, message: string): void {
  response.status(400).send(message);
}