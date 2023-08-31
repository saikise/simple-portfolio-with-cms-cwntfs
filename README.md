# Code Practice: How to create Simple Portfolio with CMS — Full-stack, Next.js, Tailwind CSS, Flowbite, Supabase

Create portfolio with content management system following a single article.

## Description

**Complete Step-by-step Tutorial on Medium**

1. In progress.

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

**Preview**

| ![A screenshot of the authentication page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/a6f2dab5-1bc2-4395-b629-544908b103f1) |
|:--:|
| Authentication |

| ![A screenshot of the home page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/6cc7ebff-f908-4e56-b63a-143fa60c03a7) |
|:--:|
| Home page |

| ![A screenshot of the projects per series page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/b977ac43-5dcd-4680-b773-b8a0c58a08b5) |
|:--:|
| Projects per series page |

| ![A screenshot of the search project page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/3847de5d-1f70-47cb-8aa1-5b79c47167e9) |
|:--:|
| Search project page |

| ![A screenshot of the add project page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/1b78e8bb-ae1a-4b11-a98a-e7ef374ed97a) |
|:--:|
| Add project page |

| ![A screenshot of the edit project page](https://github.com/saikise/simple-portfolio-with-cms-cwntfs/assets/134133636/d9c2da8f-4797-4a83-a17f-164d6fb10612) |
|:--:|
| Edit project page |

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
