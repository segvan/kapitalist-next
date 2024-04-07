const cli = require("next/dist/cli/next-start");
const nodeCron = require("node-cron");
const pricesBot = require("./dist/appWorker/bots/pricesBot");
const priceChangeBot = require("./dist/appWorker/bots/priceChangeBot");
const tradeHistoryBot = require("./dist/appWorker/bots/tradeHistoryBot");

cli.nextStart({
  "--port": 4000,
  _: [],
});

nodeCron.schedule("5 0,30 * * * *", tradeHistoryBot.run); // every 30 minutes (1st minute)
nodeCron.schedule("2-57/5 * * * *", pricesBot.run); // every 5 minutes (2nd minute)
nodeCron.schedule("3-58/5 * * * *", priceChangeBot.run); // every 5 minutes (3rd minute)
