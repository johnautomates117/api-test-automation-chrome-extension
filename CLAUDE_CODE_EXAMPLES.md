# Example Claude Code Prompts - Quick Reference

This file contains ready-to-use example prompts for common development tasks with Claude Code.

## 🚀 Getting Started

### First Time Setup
```
I'm starting work on the API Test Automation Chrome Extension project.
Please help me set up the development environment:
1. Install all npm dependencies
2. Verify the TypeScript configuration is correct
3. Ensure Vite is configured properly for Chrome extension development
4. Run a test build to make sure everything compiles
5. Create a simple test to verify the extension loads in Chrome
```

### Understanding the Codebase
```
Please analyze the current codebase structure and:
1. Explain the main architectural decisions
2. Identify the key components and their responsibilities
3. Show me how data flows through the application
4. Point out any areas that need immediate attention
5. Suggest improvements to the current structure
```

## 📦 Feature Implementation Examples

### Implementing OpenAPI Import
```
Let's implement the OpenAPI/Swagger import feature. According to the PRD section 4.1:
1. Update the ImportSpecification component to handle file uploads
2. Add YAML support using the js-yaml library
3. Implement proper validation with error messages
4. Show a loading spinner during import
5. Display a success message with API summary after import
Test with the Petstore Swagger example.
```

### Adding Test Generation
```
I need to implement the AI-powered test generation feature. Based on PRD section 4.2:
1. Complete the generateTestsWithLLM function in openrouter.js
2. Create proper prompt templates for different test types
3. Add a progress bar for test generation
4. Implement error handling for API failures
5. Parse and validate the LLM response
Show me the implementation step by step.
```

### Building Test Execution
```
Let's build the test execution engine as specified in PRD section 4.3:
1. Implement the HTTP request logic in the background script
2. Add support for custom headers and authentication
3. Create a queue system for running multiple tests
4. Implement proper timeout handling
5. Capture full request/response data for reporting
Make sure it works with both REST and GraphQL APIs.
```

## 🔧 Common Development Tasks

### Adding a New Component
```
I need to create a new React component for [ComponentName]:
1. Create the component file with TypeScript
2. Add proper prop types and interfaces
3. Include error boundaries
4. Add loading and error states
5. Write basic unit tests
6. Add the component to the appropriate parent
Follow the existing component patterns in the codebase.
```

### Integrating a New API
```
Help me integrate the [APIName] API:
1. Create a new service file in src/api/
2. Implement proper error handling and retries
3. Add TypeScript types for requests/responses
4. Create a custom hook for React components
5. Add configuration options to settings
Include examples of how to use it.
```

### Adding State Management
```
I need to add Redux state management for [FeatureName]:
1. Create a new slice with Redux Toolkit
2. Define the state interface
3. Add actions and reducers
4. Implement Chrome storage persistence
5. Create selector hooks
6. Update components to use the new state
```

## 🐛 Debugging & Fixes

### Debugging Chrome Extension Issues
```
The extension isn't working properly. Help me debug:
1. Check the manifest.json for errors
2. Look for console errors in the extension background page
3. Verify all permissions are correctly set
4. Check if content scripts are loading
5. Test in a fresh Chrome profile
Provide solutions for any issues found.
```

### Fixing Build Errors
```
I'm getting build errors. Please:
1. Analyze the error messages
2. Check for missing dependencies
3. Verify import paths are correct
4. Look for TypeScript type errors
5. Suggest fixes for each issue
6. Run a clean build after fixes
```

### Performance Optimization
```
The extension is running slowly. Help me optimize:
1. Profile the current performance
2. Identify bottlenecks in the code
3. Implement lazy loading where appropriate
4. Optimize bundle size
5. Add caching for expensive operations
6. Measure improvements after each change
```

## 📋 Testing Examples

### Writing Unit Tests
```
Help me write unit tests for [ComponentName/FunctionName]:
1. Set up the test file with proper imports
2. Mock any external dependencies
3. Write tests for happy path scenarios
4. Add edge case tests
5. Test error handling
6. Aim for >80% coverage
```

### E2E Testing Setup
```
Set up end-to-end testing for the extension:
1. Configure Playwright for Chrome extension testing
2. Create test helpers for common operations
3. Write a test for the main user flow
4. Add tests for error scenarios
5. Set up CI/CD integration
```

## 📝 Documentation Tasks

### Updating Documentation
```
Please update the documentation:
1. Update README.md with new features
2. Add JSDoc comments to new functions
3. Create a user guide for [FeatureName]
4. Update the API documentation
5. Add examples for common use cases
```

### Creating Feature Documentation
```
Document the [FeatureName] feature:
1. Explain what it does and why it's useful
2. Provide step-by-step usage instructions
3. Include screenshots or diagrams
4. Add code examples
5. List any limitations or known issues
```

## 💡 Tips for Effective Prompts

1. **Be Specific**: Reference exact file names and line numbers when possible
2. **Include Context**: Mention relevant PRD sections or requirements
3. **Request Explanations**: Ask Claude Code to explain complex implementations
4. **Iterate**: Break large tasks into smaller, manageable chunks
5. **Test Frequently**: Ask to test after each significant change

## 🔄 Iterative Development Flow

```
# Use this pattern for steady progress:
"We've completed [previous task]. 
Now let's move on to [next task] from the PRD.
First, let me test what we just built to ensure it works.
Then, please implement [specific feature] with these requirements:
[list requirements]
After implementation, we'll test again before moving forward."
```

Remember: These are examples. Customize them based on your specific needs and discoveries during development!
