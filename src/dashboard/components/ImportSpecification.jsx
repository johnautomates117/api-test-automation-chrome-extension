import React, { useState } from 'react';
import { parseOpenAPISpec } from '../../lib/openapi-parser';

function ImportSpecification({ onImport }) {
  const [importMethod, setImportMethod] = useState('file');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    try {
      const content = await file.text();
      const result = await parseOpenAPISpec(content);
      
      if (result.success) {
        setPreview(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to parse specification file');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlImport = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await parseOpenAPISpec(url);
      
      if (result.success) {
        setPreview(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch specification from URL');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (preview) {
      onImport({
        id: Date.now().toString(),
        name: preview.info.title,
        version: preview.info.version,
        description: preview.info.description,
        endpoints: preview.endpoints,
        spec: preview.spec,
        importedAt: new Date().toISOString(),
      });
      
      // Reset form
      setPreview(null);
      setUrl('');
      setError('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Import OpenAPI/Swagger Specification</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              importMethod === 'file'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setImportMethod('file')}
          >
            Upload File
          </button>
          <button
            className={`px-4 py-2 rounded ${
              importMethod === 'url'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setImportMethod('url')}
          >
            Import from URL
          </button>
        </div>
        
        {importMethod === 'file' ? (
          <div>
            <label className="block">
              <span className="text-gray-700">Choose OpenAPI/Swagger file (JSON or YAML)</span>
              <input
                type="file"
                accept=".json,.yaml,.yml"
                onChange={handleFileUpload}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Specification URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/swagger.json"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleUrlImport}
              disabled={loading || !url}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? 'Fetching...' : 'Fetch Specification'}
            </button>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {preview && (
          <div className="mt-6 space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="font-semibold text-green-800">Specification Parsed Successfully!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p><strong>Title:</strong> {preview.info.title}</p>
                <p><strong>Version:</strong> {preview.info.version}</p>
                <p><strong>Endpoints:</strong> {preview.endpoints.length}</p>
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto border rounded p-4">
              <h4 className="font-semibold mb-2">Endpoints:</h4>
              <ul className="space-y-1 text-sm">
                {preview.endpoints.map((endpoint, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-gray-700">{endpoint.path}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={handleImport}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Import Specification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImportSpecification;