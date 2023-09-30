This is a base Copilot Custom app built using [Next.js](https://nextjs.org/) and project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The easiest way to get started is to fork this repo. Once forked, you will need to deploy the app andd it to Copilot.

### Deploying

The easiest way to deploy this custom app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

- Create a new project in your Vercel account. Note: create an account if you don't have one using github to automatically import repos.
- Select the forked repo in Import Git Repository
- Set the COPILOT_API_KEY environment variable in your Vercel project settings. You can find your API key in Copilot under Settings > API. Note: You will need to be an admin to create an API Key.

### Connecting with Copilot

Use the deployed url on Vercel and [create a custom app](https://www.copilot.com/guide/other-apps#don't-see-your-app-h3) in Copilot. You will now be able to use the app in Copilot.

## Developing App

Clone your forked app locally and run the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
