# ZUNDER Chat AI Starter

[![Zunder AI Logo](/public/zunder_ai_logo_banner.png)](https://github.com/regenrek/zunder-ui)

Zunder Chat AI Starter is a simple starter for building AI Chat Applications, powered by [Zunder UI](https://github.com/regenrek/zunder-ui)

> **⚠️ IMPORTANT NOTICE**
> 
> Zunder UI is currently in an early stage of development. The API is subject to change, and breaking changes may occur in future releases.  I'm happy for you to explore and give feedback, but please use it with care.

## Features


- Full Nuxt 3 (Nuxt 4 Compatibility Mode is activated)
- Including Nuxt UI & Zunder UI
- Chat UI with ChatGPT-like UI
- Chat with Simulated Chat or bring your own OpenAI Implementation
- Dark Mode
- Responsive Design

## Setup

Make sure to install the dependencies:

Clone the repository:
```bash
git clone https://github.com/regenrek/zunder-chat-ai-starter.git my-ai-chat
```

```bash
cd my-ai-chat
pnpm install
```

## Add Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

```bash
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
USE_SIMULATED_CHAT=true # Set to false to use the real OpenAI API
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

## Why Zunder?

While Nuxt UI provides an excellent foundation for building Vue applications, there's a growing need for components specifically tailored to AI-driven interfaces. Zunder fills this gap by offering:

- AI-specific components for chat interfaces
- Elements designed for text and image generation tasks
- Tools for displaying and interacting with AI model outputs
- Seamless integration with existing Nuxt UI components
- Demos (Chat, Image Analysis, RAG, etc.)

Whether you're building a chatbot, a content generation tool, or a complex AI-powered application, Zunder provides the building blocks you need to create intuitive and powerful user interfaces.


## Documentation

For full documentation, visit [official documentation site](https://zunder.ai).

## Contributing (Coming soon)

Contributions to Zunder are welcome and appreciated! As a solo developer, I'm always excited to see community involvement. Here's how you can contribute:

1. Check out the [GitHub Issues](https://github.com/regenrek/zunder-ui/issues) for open tasks or report a new issue.
2. Fork the repository and create a new branch for your contribution.
3. Make your changes and submit a pull request.

## License

Zunder UI is open-source software licensed under the [MIT license](LICENSE.md).

## Support

For support, please open an issue on our [GitHub repository](https://github.com/regenrek/zunder-ui)

## Stay Connected

- Website [zunder.ai](https://zunder.ai)
- My X [Twitter](https://twitter.com/regenrek)
- Star on Github [GitHub repo](https://github.com/regenrek/zunder-ui)

Thank you!