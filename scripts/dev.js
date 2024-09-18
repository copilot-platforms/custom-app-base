const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const ngrok = require('@ngrok/ngrok');

const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: true });
const handle = app.getRequestHandler();

process.env.COPILOT_ENV = 'local';

app.prepare().then(async () => {
  let ngrokUrl;

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    res.setHeader('Set-Cookie', `ngrokUrl=${ngrokUrl}`);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(`> Server listening at http://localhost:${port}`);
  console.log('> Opening an ngrok tunnel to the server...');

  const listener = await ngrok.forward({
    authtoken: '2mFZeCwcrCQY26sdkBVbx1rc0Yc_5EmNLPLz7zqNpZWhM84Ba',
    addr: 3000,
  });

  console.log(`> Tunnel opened at ${listener.url()}`);
  ngrokUrl = listener.url();
});

process.stdin.resume();

process.on('SIGINT', async () => {
  console.log('> Closing ngrok tunnel...');
  await ngrok.kill();
  console.log('> Ngrok tunnel closed.');
  process.exit();
});
