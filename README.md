# ZUNDER Examples

[![Zunder AI Logo](/shared/public/zunder_ai_logo_banner.png)](https://github.com/regenrek/zunder-ui)

Zunder Chat AI Examples are simple starters for building AI Chat Applications, powered by [Zunder UI](https://github.com/regenrek/zunder-ui)


## Setup

Make sure to install the dependencies:

Clone the repository:
```bash
git clone https://github.com/regenrek/zunder-examples.git zunder-examples
```

```bash
cd zunder-examples
pnpm install
```

## Add Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

```bash
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
OPENAI_MODEL=<YOUR_OPENAI_API_KEY>
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