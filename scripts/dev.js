const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const ngrok = require('@ngrok/ngrok');

const port = parseInt(process.env.PORT || '3009', 10);
const app = next({ dev: true });
const handle = app.getRequestHandler();

process.env.COPILOT_ENV = 'local';

app.prepare().then(async () => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    res.setHeader('Set-Cookie', `ngrokUrl=${ngrokUrl}`);
    res.setHeader('X-Frame-Options', ``);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(`> Server listening at http://localhost:${port}`);
  console.log('> Opening an ngrok tunnel to the server...');

  const listener = await ngrok.forward({
    authtoken: '2mILgbDjRPvTgEnhpyUBfGkIAbz_2PW5wYbQEtFDYdKt7TEDS',
    addr: 3009,
  });

  console.log(`> Tunnel opened at ${listener.url()}`);
  const ngrokUrl = listener.url();

  const { default: open, apps } = await import('open');
  const url = `http://localhost:3000/dev-mode?appId=02f36b50-91ce-4107-8f78-4eadc28eb38c&url=${encodeURIComponent(
    ngrokUrl,
  )}`;

  console.log(`> Opening browser at ${url}`);

  open(url, {
    app: apps.browser,
  });
});

process.stdin.resume();

process.on('SIGINT', async () => {
  console.log('> Closing ngrok tunnel...');
  await ngrok.kill();
  console.log('> Ngrok tunnel closed.');
  process.exit();
});
