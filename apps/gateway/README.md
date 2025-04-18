# Vendora Gateway

A high-performance API gateway built with Bun and Express, designed to handle routing, authentication, and request/response transformations for the Vendora platform.

## Features

- 🚀 Built with Bun for exceptional performance
- 🔒 Built-in security features
- 🔄 Request/Response transformation
- 📊 Monitoring and logging
- 🔌 Plugin-based architecture
- 🧩 Easy integration with other Vendora services

## Getting Started

### Prerequisites

- Bun >= 1.0.0
- Node.js >= 18.0.0

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Project Structure

```
gateway/
├── src/
│   ├── server.ts        # Main server entry point
│   ├── routes/          # API route definitions
│   ├── middleware/      # Custom middleware
│   ├── plugins/         # Gateway plugins
│   └── utils/           # Utility functions
├── biome.json          # Biome configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Development

### Running Tests

```bash
bun test
```

### Linting

```bash
bun run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
