process.env.NODE_ENV = "test";
let log = {};

jest.mock("../src/utils/slack");

describe("Channel", () => {
  //To run before each test
  beforeEach(() => {
    //Todo: remove hard coded value
    process.env.SLACK_WEBHOOK = "https://hooks.slack.com/token/unique/id";

    // Reset the log object
    log = {
      timestamp: "01-12-2019 10:10:10.900",
      serverName: "USEASTERN-001",
      PID: parseInt(Math.random() * 1000),
      usedMemory: parseInt(Math.random() * 1000) + "MB",
      message: "This is a sample log message",
      logged: "This is a sample log message",
      line: 12,
      function: "getAllUsers",
      filename: "users.js",
      severity: "info"
    };
  });

  //To run after each test
  afterEach(() => {});

  describe("notify", () => {
    test("should post a message to slack", () => {
      expect.assertions(1);
      return Channel.notify(log).then(data =>
        expect(data.notified).toBeTruthy()
      );
    });

    test("should not post a message to slack if the webhook is non existent", () => {
      expect.assertions(1);

      //Todo: remove hard coded value
      process.env.SLACK_WEBHOOK = "https://hooks.slack.com/invalid_channel";

      return Channel.notify(log).then(data =>
        expect(data.notified).toBeFalsy()
      );
    });

    test("should throw an error on a missing env variable", () => {
      delete process.env.SLACK_WEBHOOK;

      expect(() => {
        Channel.notify(log);
      }).toThrow();
    });

    test("should throw an error on an empty env variable", () => {
      process.env.SLACK_WEBHOOK = "";

      expect(() => {
        Channel.notify(log);
      }).toThrow();
    });

    test("should throw an error on a missing log property", () => {
      delete log.PID;

      expect(() => {
        Channel.notify(log);
      }).toThrow();
    });

    test("should throw an error on an empty log property", () => {
      log.serverName = "";

      expect(() => {
        Channel.notify(log);
      }).toThrow();
    });
  });
});
