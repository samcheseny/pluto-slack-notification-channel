const http = require("http");
const url = require("url");

class Slack {
  /**
   *
   * @param {Object} webhook
   * @param {Object} body
   *
   * Sends the message to slack and returns a promise
   */
  static send(webhook, body) {
    let urlObject = url.parse(webhook);

    return new Promise((resolve, reject) => {
      let options = {
        hostname: urlObject.host,
        path: urlObject.path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length
        }
      };

      let request = http.request(options, response => {
        let buffers = [];

        response.on("error", reject);

        response.on("data", buffer => buffers.push(buffer));

        response.on("end", () => {
          if (response.statusCode === 200) {
            resolve(Buffer.concat(buffers).toString());
          } else {
            reject(Buffer.concat(buffers).toString());
          }
        });
      });

      request.on("error", error => reject(error));

      request.write(body);

      request.end();
    });
  }
}

module.exports = Slack;
