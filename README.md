# Code Practice: How to create Simple Portfolio with CMS — Full-stack, Next.js, Tailwind CSS, Flowbite, Supabase

Create portfolio with content management system following a single article.

## Description

**Complete Step-by-step Tutorial**

1. [Read on Medium](https://medium.com/@saikise/code-practice-how-to-create-simple-portfolio-with-cms-next-js-tailwind-css-flowbite-supabase-c101e25c7fc3)

**Live demo on Vercel**

1. https://simple-portfolio-with-cms-cwntfs.vercel.app

**Series:**

1. [Code Practice on Medium](https://medium.com/@saikise/list/code-practice-780f4532716a)

**Stack:**

1. [Next.js 13](https://nextjs.org/docs)
1. [Tailwind CSS](https://tailwindcss.com/)
1. [Flowbite](https://flowbite.com/)
1. [Supabase](https://supabase.com/)

**Some concepts you’ll see here**

1. Next.js App Router
1. Next.js server and client components
1. PostgreSQL database functions, policies, and trigger.
1. Supabase database and storage CRUD.

**Notes**
1. Components and icons used in this project are from Flowbite.
1. Authentication page navigation buttons are not included in Sidebar.tsx since the auth is only exclusive to owner of the web portfolio. User must manually visit `/sign-up` and `/sign-in` page via the address bar.
1. This project also only allows whitelisted emails to sign up and sign in to the app and acquire admin privileges such as adding and editing projects. Check `app/auth/sign-in/route.ts` and `app/auth/sign-up/route.ts`.

**Preview**

![Preview](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/ede36bcb-97bf-4cd5-a8f6-11fa7e993a4f)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed:

1. [GitHub CLI](https://cli.github.com/manual/installation)
1. [Node.js 16.8](https://nodejs.org/) or later.
1. macOS, Windows (including WSL), and Linux are supported.
1. [Docker Desktop](https://docs.docker.com/desktop)
1. [Prettier VS Code Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
1. [Tailwind Fold (Optional)](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)

### Installation

1. Create your GitHub repo using this project as template.

```bash
gh repo create <repo-name> --public --template=saikise/simple-portfolio-with-cms-cwntfs
```

1. Install the dependencies listed in `package.json`.

```bash
npm i
```

### Usage

To run the project, use the following command:

1. Log in to Supabaes CLI

```bash
npx supabase login
```

1. Start Supabase services.

Requires `supabase/config.toml` to be created in your current working directory by running `npx supabase init` but Supabase local config is already set up in this repo via `npx supabase init` so we can directly just start Supabase services with the command below:

```bash
npx supabase start
```

1. Start development server.

```bash
npm run dev
```
