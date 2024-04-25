import * as functions from "firebase-functions";
import RateSender from "./classes/rate-sender";

exports.send = functions.pubsub.schedule("0 10,18 * * mon,tue,wed,thu,fri")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    const code = "USDJPY";
    const sender: RateSender = new RateSender();

    return sender.send(code)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("@@@@ error");
        console.log(err);
      });
  });
