// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require("https");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require("next");

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync("../certs/ssl.key"),
  cert: fs.readFileSync("../certs/ssl.crt"),
  ca: fs.readFileSync("../certs/root.crt"),
};

app.prepare().then(() => {
  https.createServer(options, handle).listen(port, () => {
    console.log(`> Ready on localhost:${port}`);
  });
});
