import React, { useState } from 'react';

function TestResults({ results }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.testResults.some(test => test.status === filter);
  });

  const exportResults = (result) => {
    const data = JSON.stringify(result, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${result.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Results</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('passed')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'passed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Passed
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-1 rounded text-sm ${
                filter === 'failed'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Failed
            </button>
          </div>
        </div>
        
        {filteredResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No test results available. Run some tests first!
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map(result => (
              <div
                key={result.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedResult(result)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{result.suiteName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(result.startedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-green-600">
                      ✓ {result.passed} passed
                    </span>
                    <span className="text-red-600">
                      ✗ {result.failed} failed
                    </span>
                    <span className="text-gray-600">
                      {(result.duration / 1000).toFixed(2)}s
                    </span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${(result.passed / (result.passed + result.failed)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedResult && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Test Details</h3>
            <button
              onClick={() => exportResults(selectedResult)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Export JSON
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Base URL:</strong> {selectedResult.baseUrl}</p>
              <p><strong>Duration:</strong> {(selectedResult.duration / 1000).toFixed(2)}s</p>
            </div>
            
            <div className="space-y-3">
              {selectedResult.testResults.map((test, index) => (
                <div
                  key={index}
                  className={`border rounded p-3 ${
                    test.status === 'passed'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{test.testName}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {test.request.method} {test.request.path}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        test.status === 'passed' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {test.status === 'passed' ? '✓ Passed' : '✗ Failed'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {test.duration}ms
                      </span>
                    </div>
                  </div>
                  
                  {test.error && (
                    <div className="mt-2 text-sm text-red-700">
                      <strong>Error:</strong> {test.error}
                    </div>
                  )}
                  
                  {test.response && (
                    <details className="mt-2">
                      <summary className="text-sm text-gray-600 cursor-pointer">
                        Response Details
                      </summary>
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(test.response, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestResults;