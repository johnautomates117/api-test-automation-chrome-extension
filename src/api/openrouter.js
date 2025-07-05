// OpenRouter API integration for LLM interactions

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Call OpenRouter API to generate test cases
 * @param {object} params - Parameters for test generation
 * @returns {Promise<object>} Generated test cases
 */
export async function generateTestsWithLLM(params) {
  const { apiKey, model, specification, endpoint, scenarios } = params;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is required');
  }
  
  const prompt = buildTestGenerationPrompt(specification, endpoint, scenarios);
  
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': chrome.runtime.getURL('/'),
        'X-Title': 'API Test Automation Chrome Extension',
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert QA engineer specializing in API test automation. Generate comprehensive, SMART test cases based on OpenAPI specifications.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return parseGeneratedTests(data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
}

/**
 * Build prompt for test generation
 */
function buildTestGenerationPrompt(specification, endpoint, scenarios) {
  return `
Generate comprehensive API test cases for the following endpoint:

Endpoint: ${endpoint.method} ${endpoint.path}
Description: ${endpoint.description || 'No description'}

OpenAPI Specification:
${JSON.stringify(endpoint, null, 2)}

Please generate SMART test cases covering:
${scenarios.map(s => `- ${s.name}: ${s.description}`).join('\n')}

For each test case, provide:
1. Test name and description
2. Request details (method, URL, headers, body)
3. Expected response (status code, response body structure)
4. Assertions to validate the response

Format the output as a JSON array of test cases.
`;
}

/**
 * Parse generated test cases from LLM response
 */
function parseGeneratedTests(content) {
  try {
    // Extract JSON from the response
    const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const tests = JSON.parse(jsonMatch[0]);
    
    // Validate and transform test cases
    return tests.map((test, index) => ({
      id: `generated-${Date.now()}-${index}`,
      name: test.name || `Test ${index + 1}`,
      description: test.description || '',
      request: {
        method: test.request?.method || 'GET',
        path: test.request?.path || '/',
        headers: test.request?.headers || {},
        params: test.request?.params || {},
        body: test.request?.body || null,
      },
      expectedResponse: {
        statusCode: test.expectedResponse?.statusCode || 200,
        body: test.expectedResponse?.body || {},
        headers: test.expectedResponse?.headers || {},
      },
      assertions: test.assertions || [],
      generated: true,
      generatedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error parsing generated tests:', error);
    throw new Error('Failed to parse generated test cases');
  }
}

/**
 * Get available LLM models from OpenRouter
 */
export async function getAvailableModels(apiKey) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    
    const data = await response.json();
    return data.data.map(model => ({
      id: model.id,
      name: model.name || model.id,
      context_length: model.context_length,
      pricing: model.pricing,
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}