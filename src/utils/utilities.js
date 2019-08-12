const { SEVERITY_COLOR_CODE } = require("../configs");

class Utilities {
  /**
   * @param {Object} loggedMessageObject
   *
   * This is responsible for formulating a JSON string to be sent
   * to slack via the provided web hook
   */
  static formatLoggedMessageForSlack(loggedMessageObject) {
    let message = {
      text: loggedMessageObject.severity.toUpperCase(),
      attachments: [
        {
          fallback: loggedMessageObject.logged,
          color: SEVERITY_COLOR_CODE[loggedMessageObject.severity],
          text: loggedMessageObject.message,
          fields: [
            {
              title: "Timestamp",
              value: loggedMessageObject.timestamp,
              short: false
            },
            {
              title: "Server",
              value: loggedMessageObject.serverName,
              short: false
            },
            {
              title: "Process ID",
              value: loggedMessageObject.PID,
              short: true
            },
            {
              title: "Used Memory",
              value: loggedMessageObject.usedMemory,
              short: true
            },
            {
              title: "Filename",
              value: loggedMessageObject.filename,
              short: true
            },
            {
              title: "Function (Line)",
              value: `${loggedMessageObject.function} (${
                loggedMessageObject.line
              })`,
              short: true
            }
          ]
        }
      ]
    };

    return JSON.stringify(message);
  }
}

module.exports = Utilities;
