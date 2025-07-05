# AI-Powered API Test Automation Chrome Extension

## Overview

This Chrome Extension revolutionizes API test automation for QA engineers by leveraging OpenAPI/Swagger specifications and AI Large Language Models (LLMs) to streamline the creation, execution, and maintenance of API test suites.

## Features

- **API Test Automation from OpenAPI/Swagger**: Import and parse OpenAPI/Swagger specifications to automatically generate test cases
- **AI-Powered SMART Test Generation**: Generate comprehensive test cases using AI LLMs via OpenRouter
- **User-Friendly Dashboard**: Intuitive interface for managing, executing, and monitoring API tests
- **Flexible LLM Selection**: Choose from various AI models through OpenRouter integration
- **Test Maintenance Assistance**: AI-powered suggestions for updating tests as APIs evolve

## Getting Started

### Prerequisites

- Google Chrome browser (latest stable version)
- OpenRouter API key for AI/LLM integration
- Node.js and npm for development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johnautomates117/api-test-automation-chrome-extension.git
cd api-test-automation-chrome-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Project Structure

```
├── src/
│   ├── background/      # Background script for long-running tasks
│   ├── popup/          # Extension popup UI
│   ├── dashboard/      # Main dashboard interface
│   ├── content/        # Content scripts (future UI automation)
│   ├── lib/            # Shared libraries and utilities
│   ├── api/            # API integration (OpenRouter, etc.)
│   └── storage/        # Data persistence layer
├── public/             # Static assets
├── tests/              # Test files
├── docs/               # Documentation
└── manifest.json       # Chrome extension manifest
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [x] Initial Chrome Extension setup
- [ ] OpenAPI/Swagger import functionality
- [ ] AI-powered test generation via OpenRouter
- [ ] Test execution engine
- [ ] Dashboard UI implementation
- [ ] Test management features (CRUD)
- [ ] AI-assisted test maintenance
- [ ] UI test automation (future enhancement)

## Support

For questions, issues, or feature requests, please [open an issue](https://github.com/johnautomates117/api-test-automation-chrome-extension/issues).