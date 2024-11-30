<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://modus-swiss.vercel.app">
    <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1732968683924/6e48398b-761e-4b0b-9ba1-79ae837935ef.png" alt="Logo" width="100%" height="auto">
  </a>

  <h3 align="center">AI Swiss Knife Toolkit</h3>

  <p align="center">
    is an open-source application that leverages Modus and LLMs to automate or solve everyday tasks. It is completely free and open source.
    <br />
    <br />
    <!-- <br />
    <a href="https://modus-swiss.vercel.app/">View Demo</a>
    · -->
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

<!-- ## Introduction

**Modus AI Swiss Toolkit** is an open-source application that leverages Modus and LLMs to automate or solve everyday tasks. It is completely free and open source. -->

## Getting Started

### Clone the Project

```bash
git clone https://github.com/emee-dev/modus-swiss.git
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.  
You can edit the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization and [Geist](https://vercel.com/font), a Vercel font family.

---

## Environment Variables

Copy `.env.example` to `.env.local` in the root folder to set up the necessary environment variables:

```sh
# https://www.assemblyai.com/app
MODUS_ASSEMBLYAI_ASSEMBLYAI_API_KEY=""

# https://ai.google.dev/
MODUS_GOOGLE_GOOGLE_API_KEY=""

# https://app.uploadcare.com/
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=""

# Modus Dev
NEXT_PUBLIC_GRAPHQL_DEV_URL="http://localhost:8686/graphql"

# https://hypermode.com/go/<workspace>/<project-id>
NEXT_PUBLIC_GRAPHQL_PRODUCTION_URL="https://<project-id>.hypermode.app/graphql"

# https://hypermode.com/go/<workspace>/<project-id>/settings/api-keys
NEXT_PUBLIC_HYPERMODE_API_KEY=""
```

---

## Technologies

The following technologies were utilized in building this application:

- **Modus CLI**: For running functions.
- **TanStack Query**: As the requests framework.
- **Hypermode**: LLM hosting PaaS.
- **GraphQL**: For the request layer.

---

## Hypermode Models Used

The following models are defined in the `modus.json` file and used in this application:

- **AssemblyAI**: Converts media files to text (transcripts).
- **Google Gemini**: Summarizes text content.
- **Llama 3.1**: Provides copilot features and text generation.
