# Claude Code Prompt Library for API Test Automation Chrome Extension

This document contains a structured collection of prompts to guide Claude Code through implementing the AI-Powered API Test Automation Chrome Extension based on the PRD.

## Table of Contents
1. [Initial Setup & Configuration](#1-initial-setup--configuration)
2. [OpenAPI/Swagger Import Feature](#2-openapiswagger-import-feature)
3. [AI-Powered Test Generation](#3-ai-powered-test-generation)
4. [Test Execution Engine](#4-test-execution-engine)
5. [Test Management & Dashboard](#5-test-management--dashboard)
6. [Results & Reporting](#6-results--reporting)
7. [Settings & Configuration](#7-settings--configuration)
8. [Chrome Extension Integration](#8-chrome-extension-integration)
9. [Testing & Quality Assurance](#9-testing--quality-assurance)
10. [Performance & Optimization](#10-performance--optimization)

---

## 1. Initial Setup & Configuration

### 1.1 Project Setup and Dependencies
```
Review the current project structure in the api-test-automation-chrome-extension repository. 
Install all necessary dependencies and ensure the development environment is properly configured. 
Set up the Chrome extension development workflow with hot reload capabilities using Vite.
Verify that the manifest.json is correctly configured for Manifest V3.
Create a development build and test loading the extension in Chrome.
```

### 1.2 Development Environment Enhancement
```
Enhance the development setup by:
1. Adding proper TypeScript types for Chrome Extension APIs
2. Setting up path aliases for cleaner imports
3. Configuring source maps for easier debugging
4. Adding development-specific Chrome extension permissions
5. Creating npm scripts for development, building, and packaging the extension
Ensure the setup supports both development and production builds.
```

### 1.3 State Management Setup
```
Implement Redux Toolkit for state management across the extension:
1. Create a store configuration with proper Chrome extension storage persistence
2. Set up slices for: specifications, testSuites, testResults, and settings
3. Implement Chrome storage sync to persist state across browser sessions
4. Add proper TypeScript types for all state interfaces
5. Create hooks for easy state access in React components
Reference the PRD sections 4.1 and 4.5 for data structures.
```

---

## 2. OpenAPI/Swagger Import Feature

### 2.1 File Import Implementation
```
Implement the OpenAPI/Swagger file import functionality as specified in PRD section 4.1 (FR-1):
1. Create a file upload component that accepts JSON and YAML files
2. Implement file validation using the swagger-parser library
3. Add proper error handling with user-friendly error messages
4. Store successfully imported specifications in Chrome storage
5. Display a preview of the imported API structure
Include progress indicators for large file processing.
```

### 2.2 URL Import Implementation
```
Implement URL-based OpenAPI/Swagger import as specified in PRD section 4.1 (FR-2):
1. Create a URL input component with validation
2. Implement CORS-compliant fetching of specifications from URLs
3. Handle various HTTP errors gracefully (404, 500, timeout, etc.)
4. Add support for authenticated endpoints (optional headers)
5. Implement retry logic for failed requests
Test with popular API documentation URLs like Petstore Swagger.
```

### 2.3 Specification Parser Enhancement
```
Enhance the openapi-parser.js module to fully implement FR-3 from the PRD:
1. Extract all endpoint details including paths, methods, parameters, and schemas
2. Parse request/response examples from the specification
3. Identify authentication requirements for each endpoint
4. Create a normalized data structure for easier test generation
5. Add support for OpenAPI 3.0 and Swagger 2.0 formats
Generate TypeScript interfaces for the parsed specification structure.
```

### 2.4 Multiple Specification Management
```
Implement multi-specification support as per FR-4:
1. Create a specification manager component to list all imported specs
2. Add ability to switch between active specifications
3. Implement specification deletion with confirmation dialog
4. Add metadata to each spec (import date, source, version)
5. Create a search/filter functionality for specifications
Ensure proper state management for the active specification.
```

---

## 3. AI-Powered Test Generation

### 3.1 OpenRouter Integration
```
Complete the OpenRouter API integration in src/api/openrouter.js:
1. Implement secure API key storage using Chrome's encryption
2. Create a robust API client with error handling and retries
3. Implement the getAvailableModels function to fetch LLM options
4. Add request/response logging for debugging (in dev mode only)
5. Implement rate limiting to avoid API quota issues
Reference PRD section 4.6 (FR-23, FR-24) for requirements.
```

### 3.2 Test Generation Prompt Engineering
```
Implement sophisticated prompt engineering for test generation as per FR-5:
1. Create prompt templates for different test types (positive, negative, edge cases)
2. Include the relevant OpenAPI schema context in prompts
3. Add examples of expected test output format
4. Implement dynamic prompt adjustment based on endpoint complexity
5. Create a prompt preview feature for debugging
Focus on generating SMART tests as defined in PRD section 2.2.2.
```

### 3.3 Test Generation UI Implementation
```
Build the test generation interface in TestGenerator component:
1. Create endpoint selection UI with bulk selection options
2. Add test type configuration (positive/negative/edge cases)
3. Implement LLM model selection dropdown
4. Add advanced options panel for power users
5. Create a generation progress indicator with cancel ability
Include preview of generated tests before saving.
```

### 3.4 AI Response Parser
```
Implement robust parsing of LLM responses for test cases:
1. Create fault-tolerant JSON extraction from LLM responses
2. Validate generated tests against expected schema
3. Handle partial or malformed responses gracefully
4. Implement test deduplication logic
5. Add quality scoring for generated tests
Ensure all generated tests follow the structure defined in FR-7.
```

### 3.5 Test Maintenance AI Features
```
Implement AI-powered test maintenance as specified in FR-26:
1. Create a diff detector for specification changes
2. Implement impact analysis for existing tests
3. Generate update suggestions using AI
4. Create a review UI for accepting/rejecting changes
5. Implement audit logging for all AI suggestions
Include visual diff highlighting for easier review.
```

---

## 4. Test Execution Engine

### 4.1 Test Execution Core
```
Build the core test execution engine in the background script:
1. Implement HTTP request construction from test cases
2. Add support for all HTTP methods (GET, POST, PUT, DELETE, PATCH)
3. Create request queuing for batch execution
4. Implement proper timeout handling
5. Add request/response interceptors for logging
Reference FR-9 through FR-13 for detailed requirements.
```

### 4.2 Environment Configuration
```
Implement test environment management as per FR-11:
1. Create environment profiles (dev, staging, prod)
2. Implement base URL configuration per environment
3. Add global headers management (auth tokens, API keys)
4. Create environment variable substitution
5. Add import/export functionality for environments
Store environment configs securely in Chrome storage.
```

### 4.3 Assertion Engine
```
Build a comprehensive assertion engine for test validation:
1. Implement status code assertions
2. Add JSON schema validation for responses
3. Create custom assertion types (contains, regex, etc.)
4. Implement response time assertions
5. Add support for chained assertions
Include helpful error messages for failed assertions.
```

### 4.4 Test Runner UI
```
Enhance the TestRunner component with execution features:
1. Create a test execution queue visualization
2. Add real-time test status updates
3. Implement pause/resume functionality
4. Add test filtering before execution
5. Create execution history tracking
Include performance metrics during execution.
```

---

## 5. Test Management & Dashboard

### 5.1 Dashboard Layout Implementation
```
Implement the main dashboard layout as described in the PRD:
1. Create a responsive tab-based navigation system
2. Implement proper routing between dashboard sections
3. Add breadcrumb navigation for deep sections
4. Create a global search functionality
5. Implement keyboard shortcuts for common actions
Ensure consistent styling with Tailwind CSS.
```

### 5.2 Test Suite Organization
```
Build test suite management features as per FR-22:
1. Implement drag-and-drop test organization
2. Create nested test suite support
3. Add bulk operations (move, copy, delete)
4. Implement test tagging system
5. Create test suite templates
Include visual indicators for test suite status.
```

### 5.3 Test CRUD Operations
```
Implement full CRUD operations for tests as per FR-18 to FR-21:
1. Create a test editor with syntax highlighting
2. Implement test duplication functionality
3. Add test versioning/history
4. Create a test search with filters
5. Implement bulk test operations
Include validation for manually created tests.
```

### 5.4 Dashboard Analytics
```
Add analytics widgets to the dashboard:
1. Create test execution statistics charts
2. Add test pass/fail trend graphs
3. Implement endpoint coverage visualization
4. Create performance metrics dashboard
5. Add customizable dashboard widgets
Use recharts library for data visualization.
```

---

## 6. Results & Reporting

### 6.1 Test Results Storage
```
Implement comprehensive test results storage:
1. Design IndexedDB schema for test results
2. Implement result compression for storage efficiency
3. Add result archiving for old test runs
4. Create result indexing for fast queries
5. Implement result retention policies
Include migration logic for schema updates.
```

### 6.2 Results Visualization
```
Enhance the TestResults component as per FR-14 to FR-16:
1. Create detailed result views with collapsible sections
2. Implement request/response diff visualization
3. Add assertion failure highlighting
4. Create result filtering and sorting
5. Implement result comparison between runs
Include syntax highlighting for JSON payloads.
```

### 6.3 Report Generation
```
Implement report export functionality as per FR-17:
1. Create HTML report templates with styling
2. Implement CSV export with customizable columns
3. Add JSON export with full test details
4. Create PDF report generation
5. Implement report scheduling/automation
Include company branding options for reports.
```

### 6.4 Real-time Results Streaming
```
Implement real-time test results updates:
1. Create WebSocket-like communication between background and UI
2. Implement result buffering for performance
3. Add live test log streaming
4. Create real-time charts updates
5. Implement result notifications
Ensure smooth UI updates without lag.
```

---

## 7. Settings & Configuration

### 7.1 Settings Management
```
Enhance the Settings component with all configuration options:
1. Implement secure API key input and storage
2. Create LLM configuration interface
3. Add test generation preferences
4. Implement notification settings
5. Create data management options
Include settings import/export functionality.
```

### 7.2 Extension Permissions
```
Implement dynamic permission management:
1. Create permission request flow
2. Implement optional permission handling
3. Add permission status indicators
4. Create permission explanation dialogs
5. Implement permission-based feature flags
Follow Chrome extension best practices for permissions.
```

### 7.3 Data Privacy Controls
```
Implement privacy and data management features:
1. Create data deletion workflows
2. Implement data export functionality
3. Add telemetry opt-out options
4. Create activity logging controls
5. Implement data encryption options
Ensure GDPR compliance considerations.
```

---

## 8. Chrome Extension Integration

### 8.1 Extension Lifecycle Management
```
Implement proper Chrome extension lifecycle handling:
1. Add installation/update workflows
2. Implement proper cleanup on uninstall
3. Create migration logic for updates
4. Add first-run experience
5. Implement extension badge updates
Handle edge cases like browser restarts.
```

### 8.2 Cross-Component Communication
```
Implement robust message passing between extension components:
1. Create typed message protocols
2. Implement message validation
3. Add message queuing for reliability
4. Create broadcast mechanisms
5. Implement error propagation
Use Chrome runtime messaging APIs properly.
```

### 8.3 Browser Action Enhancement
```
Enhance the popup interface as per FR-27:
1. Create quick action buttons
2. Implement test status summary
3. Add recent test quick access
4. Create notification center
5. Implement popup keyboard navigation
Keep popup lightweight and responsive.
```

### 8.4 Performance Optimization
```
Optimize extension performance per NFR-1 to NFR-3:
1. Implement lazy loading for components
2. Add virtual scrolling for large lists
3. Optimize bundle size with code splitting
4. Implement caching strategies
5. Add performance monitoring
Target sub-3-second load times as specified.
```

---

## 9. Testing & Quality Assurance

### 9.1 Unit Testing Setup
```
Set up comprehensive unit testing:
1. Configure Jest/Vitest for the project
2. Create test utilities for Chrome APIs mocking
3. Write tests for all utility functions
4. Test Redux actions and reducers
5. Create snapshot tests for components
Aim for >80% code coverage.
```

### 9.2 Integration Testing
```
Implement integration tests for key workflows:
1. Test OpenAPI import flow end-to-end
2. Test complete test generation workflow
3. Verify test execution pipeline
4. Test state persistence across sessions
5. Validate Chrome storage integration
Use Playwright for browser automation.
```

### 9.3 E2E Testing Implementation
```
Create end-to-end tests for user journeys:
1. Test complete user workflow from import to results
2. Verify cross-component communication
3. Test error handling scenarios
4. Validate performance requirements
5. Test extension update scenarios
Create CI/CD pipeline for automated testing.
```

### 9.4 Accessibility Testing
```
Implement accessibility features per NFR-17:
1. Add ARIA labels to all interactive elements
2. Implement keyboard navigation throughout
3. Add screen reader support
4. Create high contrast mode
5. Test with accessibility tools
Ensure WCAG 2.1 AA compliance where applicable.
```

---

## 10. Performance & Optimization

### 10.1 Bundle Optimization
```
Optimize the extension bundle size:
1. Implement tree shaking for unused code
2. Create separate bundles for different components
3. Optimize image assets
4. Implement lazy loading for heavy libraries
5. Add bundle size monitoring
Target fast load times across all components.
```

### 10.2 Runtime Performance
```
Optimize runtime performance:
1. Implement request debouncing/throttling
2. Add virtual rendering for large lists
3. Optimize state updates with memoization
4. Implement worker threads for heavy processing
5. Add performance profiling tools
Monitor and maintain <100ms test execution target.
```

### 10.3 Memory Management
```
Implement proper memory management:
1. Add cleanup for unused test results
2. Implement pagination for large datasets
3. Create memory usage monitoring
4. Add garbage collection triggers
5. Optimize Chrome storage usage
Prevent memory leaks in long-running sessions.
```

### 10.4 Final Polish & Production Readiness
```
Prepare the extension for production release:
1. Implement error tracking (Sentry or similar)
2. Add analytics for usage insights
3. Create user onboarding flow
4. Implement update notifications
5. Prepare Chrome Web Store assets
Ensure all PRD requirements are met and tested.
```

---

## Usage Instructions

1. **Sequential Implementation**: Work through these prompts in order, as later features depend on earlier implementations.

2. **Prompt Customization**: Feel free to modify prompts based on specific implementation decisions or technical constraints discovered during development.

3. **Progress Tracking**: After each major section, test the implementation thoroughly before moving to the next.

4. **Documentation**: Update code documentation and README as you implement each feature.

5. **PRD Reference**: Always refer back to the PRD for detailed requirements and acceptance criteria.

## Example Usage with Claude Code

```bash
# Copy a prompt from above and paste it into Claude Code
# For example, to start with project setup:

"Review the current project structure in the api-test-automation-chrome-extension repository. 
Install all necessary dependencies and ensure the development environment is properly configured. 
Set up the Chrome extension development workflow with hot reload capabilities using Vite.
Verify that the manifest.json is correctly configured for Manifest V3.
Create a development build and test loading the extension in Chrome."

# Claude Code will then implement the requested features based on the PRD
```

## Additional Context to Provide

When using these prompts, you may want to provide additional context:
- Link to the GitHub repository
- Reference to specific PRD sections
- Any technical decisions already made
- Preferred libraries or approaches
- Performance requirements from the PRD
