require('dotenv').config({ path: ['.env.local', '.env.personal'] });
const { spawn } = require('child_process');

const port = 8080;
const dashboardUrl =
  process.env.ASSEMBLY_DASHBOARD_URL || 'https://dashboard.assembly.com';
const devModeUrl = `${dashboardUrl}/dev-mode?url=http://localhost:${port}`;

async function main() {
  console.log(`> Starting Next.js dev server on port ${port}...`);

  // Start Next.js dev server
  const nextProcess = spawn('npx', ['next', 'dev', '-p', port.toString()], {
    stdio: 'inherit',
    env: { ...process.env, ASSEMBLY_ENV: 'local' },
  });

  // Wait a moment for the server to start, then open browser
  setTimeout(async () => {
    const { default: open } = await import('open');
    console.log(`> Opening browser at ${devModeUrl}`);
    open(devModeUrl);
  }, 2000);

  nextProcess.on('close', (code) => {
    process.exit(code);
  });
}

main();
