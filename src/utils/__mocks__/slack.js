const url = require("url");

class Slack {
  /**
   *
   * @param {String} webhook
   * @param {Object} body
   *
   * Sends the message to slack and returns a promise
   */
  static send(webhook, body) {
    let urlObject = url.parse(webhook);

    return new Promise((resolve, reject) => {
      //Todo: remove hard coded value
      if (urlObject.path.includes("invalid_channel")) {
        return reject("Channel not found");
      }

      resolve("ok");
    });
  }
}

module.exports = Slack;
