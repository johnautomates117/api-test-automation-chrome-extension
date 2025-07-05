import React, { useState, useEffect } from 'react';
import { getAvailableModels } from '../../api/openrouter';

function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4');
  const [availableModels, setAvailableModels] = useState([]);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings
    chrome.storage.local.get(['openRouterApiKey', 'selectedLLM'], (data) => {
      if (data.openRouterApiKey) setApiKey(data.openRouterApiKey);
      if (data.selectedLLM) setSelectedModel(data.selectedLLM);
    });
  }, []);

  const handleSaveSettings = () => {
    chrome.storage.local.set({
      openRouterApiKey: apiKey,
      selectedLLM: selectedModel,
    }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  const handleTestConnection = async () => {
    if (!apiKey) {
      setConnectionStatus({ success: false, message: 'Please enter an API key' });
      return;
    }
    
    setTestingConnection(true);
    setConnectionStatus(null);
    
    try {
      const models = await getAvailableModels(apiKey);
      
      if (models.length > 0) {
        setAvailableModels(models);
        setConnectionStatus({
          success: true,
          message: `Successfully connected! Found ${models.length} available models.`,
        });
      } else {
        setConnectionStatus({
          success: false,
          message: 'Connection successful but no models found.',
        });
      }
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: 'Failed to connect. Please check your API key.',
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all test data? This cannot be undone.')) {
      chrome.storage.local.set({
        specifications: [],
        testSuites: [],
        testResults: [],
      }, () => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">OpenRouter Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Get your API key from{' '}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    OpenRouter
                  </a>
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleTestConnection}
                  disabled={testingConnection || !apiKey}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
                >
                  {testingConnection ? 'Testing...' : 'Test Connection'}
                </button>
              </div>
              
              {connectionStatus && (
                <div className={`p-3 rounded ${
                  connectionStatus.success
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {connectionStatus.message}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Default AI Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableModels.length > 0 ? (
                    availableModels.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))
                  ) : (
                    <option value={selectedModel}>{selectedModel}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Data Management</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-2">
                  Clear all test data including specifications, test suites, and results.
                </p>
                <button
                  onClick={handleClearData}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Settings
            </button>
          </div>
          
          {saved && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
              Settings saved successfully!
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-3">About</h3>
        <div className="text-gray-600 space-y-2">
          <p><strong>Version:</strong> 0.1.0</p>
          <p><strong>Author:</strong> Manus AI</p>
          <p>
            <strong>Documentation:</strong>{' '}
            <a
              href="https://github.com/johnautomates117/api-test-automation-chrome-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub Repository
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;