import {Util} from "./util";
import * as url from "url";
import * as https from "https";
import * as admin from "firebase-admin";

export default class RateSender {
  private _loaded = false;
  private _rate: { [index: string]: object } = {};

  private async readJson(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const config = Util.config();
      const option = url.parse(config["rate-url"]);
      const request = https.get(option, (response) => {
        response.setEncoding("utf8");
        let responseBody = "";
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          resolve(responseBody);
        });
        response.on("error", (e) => {
          reject(e);
        });
      });
      request.end();
    });
  }

  private async load(): Promise<void> {
    const json: string = await this.readJson();
    const decoded = JSON.parse(json);
    const quotes: any[] = decoded["quotes"];
    for (const val of quotes) {
      this._rate[val["currencyPairCode"]] = val;
    }
    this._loaded = true;
  }

  public async rate(pairCode: string): Promise<any> {
    if (!this._loaded) {
      await this.load();
    }

    return Object.prototype.hasOwnProperty.call(this._rate, pairCode) ?
      this._rate[pairCode] : {};
  }

  public async send(pairCode: string): Promise<string> {
    const config = Util.config();
    const sdk = Util.config("sdk");
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(sdk),
        databaseURL: config["fb-databaseURL"],
      });
    }

    const rate: any = await this.rate(pairCode);
    const message = {
      notification: {
        title: `${pairCode.substr(0, 3)} -> ${pairCode.substr(3)}`,
        body: `bid:${rate["bid"]} ask:${rate["ask"]}`,
      },
      data: {
        url: "/rates",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
      topic: `${pairCode}`,
    };

    return new Promise<string>(((resolve, reject) => {
      admin.messaging().send(message).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    }));
  }
}
