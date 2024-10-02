# README for Custom App Base

This repository is a starting point for [Copilot Apps](https://www.copilot.com/apps). It is built using using [Next.js](https://nextjs.org/) and was bootstrapped with [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app).

### Benefits

Copilot Apps can be embedded in your internal dashboard and client portal and they can use our REST API to fetch information and perform actions, extending the Copilot production with custom functionality to meet a variety of needs.

### Prerequisites

In order to build a Copilot custom app you’ll need a knowledge of modern web development. Here are some of the tools you’ll encounter in this repository:

- Node.JS
- React
- Next.JS
- Yarn (NPM, PNPM, Bun or any other Node.JS package manager are also possible, but we use Yarn)

### Getting Started

The easiest way to get started is to fork this repo. Once forked, you will need to deploy the app and add it to Copilot.

**Deploying and Configuring App**

The easiest way to deploy this custom app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

- Create a new project in your Vercel account. Note: create an account if you don't have one using github to automatically import repos.
- Select the forked repo in Import Git Repository
- In environment variables add COPILOT_API_KEY. Your API key will be generated after you [add your app in the Copilot dashboard](https://dashboard.copilot.com/app-setup/setup?moduleType=extension&moduleId=new&preset=custom&appId=). You can submit 3 different URLs for your app: an internal URL for [internal users](https://docs.copilot.com/reference/internal-users), a client URL for [clients](https://docs.copilot.com/reference/clients), and a webhook URL that allows your app to subscribe to various [webhook events](https://docs.copilot.com/reference/webhooks-events). These values can all be edited after you create your app, so you can start with a simple config and add to it later.

### **Developing App**

All you need to do to get started developing is clone your forked app locally and run a few commands.

**Install dependencies**

```tsx
yarn install
```

**Run the app locally**

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Content Security Policy

The Content Security Policy in the custom app base should be configured in `src/middleware.ts`. In the `cspHeader` variable under `frame-ancestors`, `https://dashboard.copilot.com` and `https://*.copilot.app` are pre-configured. If you have a custom domain, you'll also want to add your custom domain here. For example, `https://portal.mycompany.com`.
