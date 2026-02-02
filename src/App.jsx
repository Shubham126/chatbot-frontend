import { useState, useEffect } from 'react';
import './index.css';
import * as api from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('scrape');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await api.checkHealth();
      setBackendStatus('online');
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  // Scrape Tab State
  const [scrapeUrl, setScrapeUrl] = useState('');

  // Chat Tab State
  const [chatUrl, setChatUrl] = useState('');
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Auth Tab State
  const [authAction, setAuthAction] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // SEO Tab State
  const [seoAction, setSeoAction] = useState('keyword-research');
  const [seoInput, setSeoInput] = useState('');

  // API Key Tab State
  const [apiKeyAction, setApiKeyAction] = useState('get');
  const [apiKeyValue, setApiKeyValue] = useState('');

  // Files Tab State
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');

  // ==================== SCRAPE HANDLERS ====================
  const handleScrape = async () => {
    if (!scrapeUrl) return;
    setLoading(true);
    try {
      const data = await api.scrapeWebsite(scrapeUrl);
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeUrl = async () => {
    if (!scrapeUrl) return;
    setLoading(true);
    try {
      const data = await api.scrapeUrl(scrapeUrl);
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  // ==================== CHAT HANDLERS ====================
  const handleChat = async () => {
    if (!chatUrl || !chatQuestion) return;
    setLoading(true);
    try {
      const data = await api.chatWithWebsite(chatUrl, chatQuestion);
      const newMessage = { question: chatQuestion, answer: data.answer, url: chatUrl };
      setChatHistory([...chatHistory, newMessage]);
      setResponse({ success: true, data });
      setChatQuestion('');
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  // ==================== AUTH HANDLERS ====================
  const handleAuth = async () => {
    setLoading(true);
    try {
      let data;
      if (authAction === 'register') {
        data = await api.register(authName, authEmail, authPassword);
      } else if (authAction === 'login') {
        data = await api.login(authEmail, authPassword);
      } else if (authAction === 'logout') {
        data = await api.logout();
      } else if (authAction === 'profile') {
        data = await api.getProfile();
      } else if (authAction === 'check') {
        data = await api.checkAuth();
      }
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  // ==================== SEO HANDLERS ====================
  const handleSEO = async () => {
    if (!seoInput) return;
    setLoading(true);
    try {
      let data;
      if (seoAction === 'keyword-research') {
        data = await api.keywordResearch(seoInput);
      } else if (seoAction === 'domain-keywords') {
        data = await api.domainKeywordsList(seoInput);
      } else if (seoAction === 'domain-pages') {
        data = await api.domainPagesList(seoInput);
      } else if (seoAction === 'domain-backlinks') {
        data = await api.domainBacklinkAnalysis(seoInput);
      } else if (seoAction === 'keyword-data') {
        data = await api.keywordData(seoInput);
      } else if (seoAction === 'domain-analysis') {
        data = await api.domainAnalysis(seoInput);
      }
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  // ==================== API KEY HANDLERS ====================
  const handleApiKey = async () => {
    setLoading(true);
    try {
      let data;
      if (apiKeyAction === 'generate') {
        data = await api.generateApiKey();
      } else if (apiKeyAction === 'get') {
        data = await api.getApiKey();
      } else if (apiKeyAction === 'revoke') {
        data = await api.revokeApiKey();
      } else if (apiKeyAction === 'validate') {
        data = await api.validateApiKey(apiKeyValue);
      }
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  // ==================== FILES HANDLERS ====================
  const handleGetFiles = async () => {
    setLoading(true);
    try {
      const data = await api.getScrapedFiles();
      setFiles(data.files || []);
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGetFileContent = async () => {
    if (!selectedFileId) return;
    setLoading(true);
    try {
      const data = await api.getFileContent(selectedFileId);
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!selectedFileId) return;
    setLoading(true);
    try {
      const data = await api.deleteFile(selectedFileId);
      setResponse({ success: true, data });
      handleGetFiles(); // Refresh list
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGetStats = async () => {
    setLoading(true);
    try {
      const data = await api.getStorageStats();
      setResponse({ success: true, data });
    } catch (error) {
      setResponse({ success: false, error: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>
            <span className="logo-icon">🚀</span>
            ChatFlow AI - Testing Dashboard
          </h1>
          <div className="status-indicator">
            <div className={`status-dot ${backendStatus}`}></div>
            <span>Backend: {backendStatus}</span>
            <button className="btn btn-small btn-secondary" onClick={checkBackendHealth}>
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'scrape' ? 'active' : ''}`} onClick={() => setActiveTab('scrape')}>
            🌐 Scrape
          </button>
          <button className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            💬 Chat
          </button>
          <button className={`tab ${activeTab === 'auth' ? 'active' : ''}`} onClick={() => setActiveTab('auth')}>
            🔐 Auth
          </button>
          <button className={`tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>
            📊 SEO Tools
          </button>
          <button className={`tab ${activeTab === 'apikey' ? 'active' : ''}`} onClick={() => setActiveTab('apikey')}>
            🔑 API Keys
          </button>
          <button className={`tab ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
            📁 Files
          </button>
        </div>

        {/* SCRAPE TAB */}
        {activeTab === 'scrape' && (
          <div className="glass-card">
            <h2 className="section-title">Website Scraping</h2>
            <div className="form-group">
              <label className="form-label">Website URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://example.com"
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
              />
            </div>
            <div className="quick-actions">
              <button className="btn btn-primary" onClick={handleScrape} disabled={loading}>
                {loading ? <span className="spinner"></span> : '📥'} Scrape & Save
              </button>
              <button className="btn btn-secondary" onClick={handleScrapeUrl} disabled={loading}>
                {loading ? <span className="spinner"></span> : '🤖'} Scrape with AI
              </button>
              <button className="btn btn-small btn-secondary" onClick={() => setScrapeUrl('https://example.com')}>
                Example.com
              </button>
              <button className="btn btn-small btn-secondary" onClick={() => setScrapeUrl('https://en.wikipedia.org/wiki/Artificial_intelligence')}>
                Wikipedia AI
              </button>
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="glass-card">
            <h2 className="section-title">AI Chat</h2>
            <div className="form-group">
              <label className="form-label">Website URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://example.com"
                value={chatUrl}
                onChange={(e) => setChatUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Your Question</label>
              <textarea
                className="form-textarea"
                placeholder="What is this website about?"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleChat} disabled={loading}>
              {loading ? <span className="spinner"></span> : '💬'} Ask AI
            </button>

            {chatHistory.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="section-title">Chat History</h3>
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className="glass-card" style={{ marginBottom: '1rem' }}>
                    <p><strong>Q:</strong> {msg.question}</p>
                    <p><strong>A:</strong> {msg.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AUTH TAB */}
        {activeTab === 'auth' && (
          <div className="glass-card">
            <h2 className="section-title">Authentication</h2>
            <div className="form-group">
              <label className="form-label">Action</label>
              <select className="form-select" value={authAction} onChange={(e) => setAuthAction(e.target.value)}>
                <option value="login">Login</option>
                <option value="register">Register</option>
                <option value="logout">Logout</option>
                <option value="profile">Get Profile</option>
                <option value="check">Check Auth</option>
              </select>
            </div>
            {authAction === 'register' && (
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                />
              </div>
            )}
            {(authAction === 'login' || authAction === 'register') && (
              <>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="user@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                  />
                </div>
              </>
            )}
            <button className="btn btn-primary" onClick={handleAuth} disabled={loading}>
              {loading ? <span className="spinner"></span> : '🔐'} Execute
            </button>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="glass-card">
            <h2 className="section-title">SEO Tools</h2>
            <div className="form-group">
              <label className="form-label">Tool</label>
              <select className="form-select" value={seoAction} onChange={(e) => setSeoAction(e.target.value)}>
                <option value="keyword-research">Keyword Research</option>
                <option value="domain-keywords">Domain Keywords</option>
                <option value="domain-pages">Domain Pages</option>
                <option value="domain-backlinks">Domain Backlinks</option>
                <option value="keyword-data">Keyword Data</option>
                <option value="domain-analysis">Domain Analysis</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                {seoAction.includes('keyword') ? 'Keyword' : 'Domain'}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={seoAction.includes('keyword') ? 'AI technology' : 'example.com'}
                value={seoInput}
                onChange={(e) => setSeoInput(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSEO} disabled={loading}>
              {loading ? <span className="spinner"></span> : '📊'} Analyze
            </button>
          </div>
        )}

        {/* API KEY TAB */}
        {activeTab === 'apikey' && (
          <div className="glass-card">
            <h2 className="section-title">API Key Management</h2>
            <div className="form-group">
              <label className="form-label">Action</label>
              <select className="form-select" value={apiKeyAction} onChange={(e) => setApiKeyAction(e.target.value)}>
                <option value="get">Get API Key</option>
                <option value="generate">Generate New Key</option>
                <option value="revoke">Revoke Key</option>
                <option value="validate">Validate Key</option>
              </select>
            </div>
            {apiKeyAction === 'validate' && (
              <div className="form-group">
                <label className="form-label">API Key to Validate</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="ck_..."
                  value={apiKeyValue}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                />
              </div>
            )}
            <button className="btn btn-primary" onClick={handleApiKey} disabled={loading}>
              {loading ? <span className="spinner"></span> : '🔑'} Execute
            </button>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'files' && (
          <div className="glass-card">
            <h2 className="section-title">File Management</h2>
            <div className="quick-actions">
              <button className="btn btn-primary" onClick={handleGetFiles} disabled={loading}>
                {loading ? <span className="spinner"></span> : '📁'} Get All Files
              </button>
              <button className="btn btn-secondary" onClick={handleGetStats} disabled={loading}>
                {loading ? <span className="spinner"></span> : '📊'} Get Stats
              </button>
            </div>

            {files.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Select File</label>
                  <select className="form-select" value={selectedFileId} onChange={(e) => setSelectedFileId(e.target.value)}>
                    <option value="">-- Select a file --</option>
                    {files.map((file) => (
                      <option key={file._id} value={file._id}>
                        {file.url} ({new Date(file.scrapedAt).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="quick-actions">
                  <button className="btn btn-secondary" onClick={handleGetFileContent} disabled={!selectedFileId || loading}>
                    View Content
                  </button>
                  <button className="btn btn-danger" onClick={handleDeleteFile} disabled={!selectedFileId || loading}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RESPONSE DISPLAY */}
        {response && (
          <div className="glass-card response-container">
            <div className="response-header">
              <h3 className="section-title">Response</h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={`response-badge ${response.success ? 'success' : 'error'}`}>
                  {response.success ? '✓ Success' : '✗ Error'}
                </span>
                <button
                  className="btn btn-small btn-secondary"
                  onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                >
                  📋 Copy
                </button>
                <button className="btn btn-small btn-secondary" onClick={() => setResponse(null)}>
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="response-content">
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>ChatFlow AI Testing Dashboard • Built with React + Vite</p>
      </footer>
    </>
  );
}

export default App;
