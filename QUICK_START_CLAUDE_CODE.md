# Quick Start Guide for Claude Code

This guide will help you get started with using Claude Code to implement the API Test Automation Chrome Extension.

## Prerequisites

1. **Claude Code Access**: Ensure you have access to Claude Code (currently in research preview)
2. **Git**: Make sure Git is installed on your system
3. **Node.js**: Version 18 or higher recommended
4. **Google Chrome**: Latest stable version for testing

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/johnautomates117/api-test-automation-chrome-extension.git
cd api-test-automation-chrome-extension
```

### 2. Open in Claude Code

In your terminal, navigate to the project directory and run:
```bash
claude-code .
```

Or open Claude Code and navigate to the project directory.

### 3. First Prompt to Claude Code

Start with this comprehensive context-setting prompt:

```
I'm working on an AI-Powered API Test Automation Chrome Extension. 
Please review the PRD.md and CLAUDE_CODE_PROMPTS.md files in this repository.

The project is already initialized with:
- Chrome Extension Manifest V3 setup
- React + Vite configuration
- Basic component structure
- TypeScript support
- Tailwind CSS

Let's start by reviewing the current setup and ensuring all dependencies are properly installed.
Then we'll begin implementing features according to the prompt library.

First, please:
1. Run `npm install` to install dependencies
2. Review the project structure
3. Identify any missing dependencies we need
4. Set up the development environment
5. Create a development build to test the extension loads properly
```

## Using the Prompt Library

The `CLAUDE_CODE_PROMPTS.md` file contains structured prompts organized by feature area:

### Phase 1: Foundation (Week 1)
- Section 1: Initial Setup & Configuration
- Section 8.1-8.2: Chrome Extension Integration basics

### Phase 2: Core Features (Week 2-3)
- Section 2: OpenAPI/Swagger Import Feature
- Section 3.1-3.2: Basic AI Integration

### Phase 3: Test Generation (Week 3-4)
- Section 3.3-3.5: Complete AI Test Generation
- Section 5.1-5.2: Dashboard Implementation

### Phase 4: Test Execution (Week 4-5)
- Section 4: Test Execution Engine
- Section 6.1-6.2: Results Storage & Display

### Phase 5: Polish & Advanced Features (Week 5-6)
- Section 6.3-6.4: Reporting
- Section 7: Settings & Configuration
- Section 9: Testing
- Section 10: Performance Optimization

## Best Practices with Claude Code

### 1. Incremental Development
```
# After each major implementation, test it:
"I've reviewed your implementation of [feature]. 
Let's test it by:
1. Building the extension: npm run build
2. Loading it in Chrome
3. Verifying the feature works as expected
4. Fixing any issues found

Then we'll commit the changes and move to the next feature."
```

### 2. Regular Testing
```
# Periodically run tests:
"Let's pause implementation to:
1. Run the test suite: npm test
2. Check for any linting issues: npm run lint
3. Verify the build still works: npm run build
4. Test the extension in Chrome
Fix any issues before continuing."
```

### 3. Documentation Updates
```
# Keep documentation in sync:
"We've completed [feature]. Please:
1. Update the README.md with any new setup steps
2. Add inline code documentation
3. Update the feature checklist in README
4. Create a brief usage guide for this feature"
```

### 4. Version Control
```
# Commit changes regularly:
"Let's commit our progress:
1. Review the changes we've made
2. Create a meaningful commit message
3. Push to the repository
4. Create a GitHub issue for any TODOs we've identified"
```

## Common Commands

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build extension for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier

# Testing
npm test            # Run test suite
npm run test:ui     # Run tests with UI

# Chrome Extension
# After building, load extension from 'dist' folder in chrome://extensions/
```

## Troubleshooting Tips

### Extension Not Loading
1. Ensure you've run `npm run build`
2. Check manifest.json for errors
3. Look at Chrome extension error logs

### Module Import Errors
1. Check tsconfig.json path mappings
2. Ensure all dependencies are installed
3. Verify import paths are correct

### API Integration Issues
1. Check CORS settings
2. Verify API keys are properly stored
3. Check network tab for request details

## Getting Help

1. **PRD Reference**: Always refer to `PRD.md` for detailed requirements
2. **Prompt Library**: Use `CLAUDE_CODE_PROMPTS.md` for structured implementation prompts
3. **GitHub Issues**: Create issues for bugs or feature discussions
4. **Code Comments**: Add TODO comments for future work

## Next Steps

1. Complete the initial setup (Section 1 of prompt library)
2. Implement one feature at a time
3. Test thoroughly after each implementation
4. Commit changes regularly
5. Update documentation as you go

Remember: The prompt library is a guide. Feel free to adapt prompts based on discoveries during implementation!
