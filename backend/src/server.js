const app = require("./app");
const config = require("./config");
const { connectDB } = require("./config/db");

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(
      `\n🚀 SDT Backend running on http://localhost:${config.port} [${config.env}]`,
    );
    console.log(`   Health:  http://localhost:${config.port}/health`);
    console.log(`   API:     http://localhost:${config.port}/api\n`);
  });
}

start().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
