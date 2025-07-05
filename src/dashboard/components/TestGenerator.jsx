import React, { useState, useEffect } from 'react';
import { generateTestScenarios } from '../../lib/openapi-parser';
import { generateTestsWithLLM, getAvailableModels } from '../../api/openrouter';

function TestGenerator({ specifications, onGenerate }) {
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedEndpoints, setSelectedEndpoints] = useState([]);
  const [llmModel, setLlmModel] = useState('openai/gpt-4');
  const [apiKey, setApiKey] = useState('');
  const [availableModels, setAvailableModels] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load saved API key and model preference
    chrome.storage.local.get(['openRouterApiKey', 'selectedLLM'], (data) => {
      if (data.openRouterApiKey) setApiKey(data.openRouterApiKey);
      if (data.selectedLLM) setLlmModel(data.selectedLLM);
    });
  }, []);

  useEffect(() => {
    if (apiKey) {
      fetchAvailableModels();
    }
  }, [apiKey]);

  const fetchAvailableModels = async () => {
    const models = await getAvailableModels(apiKey);
    setAvailableModels(models);
  };

  const handleSpecChange = (specId) => {
    setSelectedSpec(specId);
    setSelectedEndpoints([]);
  };

  const handleEndpointToggle = (endpoint) => {
    setSelectedEndpoints(prev => {
      const exists = prev.find(e => 
        e.path === endpoint.path && e.method === endpoint.method
      );
      
      if (exists) {
        return prev.filter(e => 
          !(e.path === endpoint.path && e.method === endpoint.method)
        );
      } else {
        return [...prev, endpoint];
      }
    });
  };

  const handleGenerateTests = async () => {
    if (!selectedSpec || selectedEndpoints.length === 0) {
      setError('Please select a specification and at least one endpoint');
      return;
    }
    
    if (!apiKey) {
      setError('Please configure your OpenRouter API key in settings');
      return;
    }
    
    setGenerating(true);
    setError('');
    setProgress(0);
    
    try {
      const spec = specifications.find(s => s.id === selectedSpec);
      const generatedTests = [];
      
      for (let i = 0; i < selectedEndpoints.length; i++) {
        const endpoint = selectedEndpoints[i];
        const scenarios = generateTestScenarios(endpoint);
        
        setProgress(Math.round((i / selectedEndpoints.length) * 100));
        
        const tests = await generateTestsWithLLM({
          apiKey,
          model: llmModel,
          specification: spec.spec,
          endpoint,
          scenarios,
        });
        
        generatedTests.push(...tests);
      }
      
      // Create test suite
      const testSuite = {
        id: Date.now().toString(),
        name: `${spec.name} Test Suite`,
        specificationId: spec.id,
        tests: generatedTests,
        createdAt: new Date().toISOString(),
        llmModel,
      };
      
      onGenerate(testSuite);
      
      // Reset selection
      setSelectedEndpoints([]);
      setProgress(100);
      
      setTimeout(() => {
        setProgress(0);
        setGenerating(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setGenerating(false);
    }
  };

  const currentSpec = specifications.find(s => s.id === selectedSpec);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Generate API Tests with AI</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Select Specification
            </label>
            <select
              value={selectedSpec}
              onChange={(e) => handleSpecChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a specification...</option>
              {specifications.map(spec => (
                <option key={spec.id} value={spec.id}>
                  {spec.name} (v{spec.version})
                </option>
              ))}
            </select>
          </div>
          
          {currentSpec && (
            <div>
              <label className="block text-gray-700 mb-2">
                Select Endpoints to Test ({selectedEndpoints.length} selected)
              </label>
              <div className="max-h-64 overflow-y-auto border rounded p-4 space-y-2">
                {currentSpec.endpoints.map((endpoint, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedEndpoints.some(e => 
                        e.path === endpoint.path && e.method === endpoint.method
                      )}
                      onChange={() => handleEndpointToggle(endpoint)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-sm text-gray-700 flex-1">{endpoint.path}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 mb-2">
              AI Model
            </label>
            <select
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={availableModels.length === 0}
            >
              {availableModels.length > 0 ? (
                availableModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))
              ) : (
                <option value={llmModel}>{llmModel}</option>
              )}
            </select>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {generating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Generating tests...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          <button
            onClick={handleGenerateTests}
            disabled={generating || !selectedSpec || selectedEndpoints.length === 0}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
          >
            {generating ? 'Generating...' : 'Generate Tests with AI'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestGenerator;