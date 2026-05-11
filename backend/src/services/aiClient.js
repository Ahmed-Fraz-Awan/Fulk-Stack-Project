const axios = require("axios");
const config = require("../config");

const client = axios.create({
  baseURL: config.aiServiceUrl,
  timeout: 10000,
});

async function safeCall(path, body) {
  try {
    const res = await client.post(path, body);
    return res.data;
  } catch (err) {
    console.warn(
      `[ai] fallback for ${path}: ${err.code || err.message}`,
    );
    return null;
  }
}

module.exports = { client, safeCall };
