import React, { useState } from 'react';

function TestRunner({ testSuites, onResults }) {
  const [selectedSuite, setSelectedSuite] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.example.com');
  const [headers, setHeaders] = useState('{}');
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');

  const handleRunTests = async () => {
    if (!selectedSuite) return;
    
    setRunning(true);
    setProgress(0);
    
    const suite = testSuites.find(s => s.id === selectedSuite);
    const results = {
      id: Date.now().toString(),
      suiteId: suite.id,
      suiteName: suite.name,
      startedAt: new Date().toISOString(),
      baseUrl,
      testResults: [],
    };
    
    try {
      const parsedHeaders = JSON.parse(headers);
      
      for (let i = 0; i < suite.tests.length; i++) {
        const test = suite.tests[i];
        setCurrentTest(test.name);
        setProgress(Math.round(((i + 1) / suite.tests.length) * 100));
        
        const result = await executeTest(test, baseUrl, parsedHeaders);
        results.testResults.push(result);
      }
      
      results.completedAt = new Date().toISOString();
      results.duration = new Date(results.completedAt) - new Date(results.startedAt);
      results.passed = results.testResults.filter(r => r.status === 'passed').length;
      results.failed = results.testResults.filter(r => r.status === 'failed').length;
      
      onResults(results);
      setRunning(false);
      setCurrentTest('');
    } catch (error) {
      console.error('Test execution error:', error);
      setRunning(false);
    }
  };

  const executeTest = async (test, baseUrl, headers) => {
    const startTime = Date.now();
    
    try {
      // Send message to background script to execute test
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage(
          {
            action: 'executeTests',
            data: {
              tests: [test],
              baseUrl,
              headers,
            },
          },
          resolve
        );
      });
      
      const endTime = Date.now();
      
      return {
        testId: test.id,
        testName: test.name,
        status: response.results?.[0]?.status || 'failed',
        duration: endTime - startTime,
        request: test.request,
        response: response.results?.[0]?.response || {},
        assertions: test.assertions,
        error: response.error,
      };
    } catch (error) {
      return {
        testId: test.id,
        testName: test.name,
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
      };
    }
  };

  const currentSuite = testSuites.find(s => s.id === selectedSuite);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Run API Tests</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Select Test Suite
            </label>
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={running}
            >
              <option value="">Choose a test suite...</option>
              {testSuites.map(suite => (
                <option key={suite.id} value={suite.id}>
                  {suite.name} ({suite.tests.length} tests)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">
              Base URL
            </label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={running}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">
              Headers (JSON)
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder='{"Authorization": "Bearer token"}'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              rows={4}
              disabled={running}
            />
          </div>
          
          {currentSuite && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-gray-700 mb-2">Test Suite Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Created:</strong> {new Date(currentSuite.createdAt).toLocaleString()}</p>
                <p><strong>LLM Model:</strong> {currentSuite.llmModel}</p>
                <p><strong>Total Tests:</strong> {currentSuite.tests.length}</p>
              </div>
            </div>
          )}
          
          {running && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Running: {currentTest}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          <button
            onClick={handleRunTests}
            disabled={running || !selectedSuite}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 transition-colors"
          >
            {running ? 'Running Tests...' : 'Run Tests'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestRunner;