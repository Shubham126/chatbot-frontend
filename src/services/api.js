import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost
    ? 'http://localhost:3000/api'
    : 'https://chatbot-backend-srhg.onrender.com/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// ==================== HEALTH CHECK ====================
export const checkHealth = async () => {
    const baseUrl = isLocalhost ? 'http://localhost:3000' : 'https://chatbot-backend-srhg.onrender.com';
    const response = await axios.get(`${baseUrl}/`);
    return response.data;
};

// ==================== SCRAPE ENDPOINTS ====================
export const scrapeWebsite = async (url) => {
    const response = await api.post('/scrape/save', { url });
    return response.data;
};

export const scrapeUrl = async (url) => {
    const response = await api.post('/scrape/url', { url });
    return response.data;
};

export const chatWithWebsite = async (url, question) => {
    const response = await api.post('/scrape/chat', { url, question });
    return response.data;
};

export const getScrapedFiles = async () => {
    const response = await api.get('/scrape/files');
    return response.data;
};

export const getFileContent = async (id) => {
    const response = await api.get(`/scrape/files/${id}`);
    return response.data;
};

export const getThemeData = async (id) => {
    const response = await api.get(`/scrape/theme/${id}`);
    return response.data;
};

export const getSdkConfig = async () => {
    const response = await api.get('/scrape/sdk-config');
    return response.data;
};

export const renameFile = async (id, newName) => {
    const response = await api.put(`/scrape/files/${id}/rename`, { newName });
    return response.data;
};

export const deleteFile = async (id) => {
    const response = await api.delete(`/scrape/files/${id}`);
    return response.data;
};

export const getStorageStats = async () => {
    const response = await api.get('/scrape/stats');
    return response.data;
};

export const saveIntegrationSettings = async (settings) => {
    const response = await api.post('/scrape/dashboard/integration-settings', settings);
    return response.data;
};

// ==================== AUTH ENDPOINTS ====================
export const checkAuth = async () => {
    const response = await api.get('/auth/check');
    return response.data;
};

export const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const updateProfile = async (name, email) => {
    const response = await api.put('/auth/profile', { name, email });
    return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
    const response = await api.put('/auth/password', { currentPassword, newPassword });
    return response.data;
};

export const generateApiKey = async () => {
    const response = await api.post('/auth/api-key/generate');
    return response.data;
};

export const getApiKey = async () => {
    const response = await api.get('/auth/api-key');
    return response.data;
};

export const revokeApiKey = async () => {
    const response = await api.delete('/auth/api-key');
    return response.data;
};

export const validateApiKey = async (apiKey) => {
    const response = await api.post('/auth/validate-api-key', {}, {
        headers: { 'x-api-key': apiKey }
    });
    return response.data;
};

// ==================== SEO TOOLS ENDPOINTS ====================
export const keywordResearch = async (keyword) => {
    const response = await api.post('/keyword-research', { keyword });
    return response.data;
};

export const domainKeywordsList = async (domain) => {
    const response = await api.post('/domain-keywords', { domain });
    return response.data;
};

export const domainPagesList = async (domain) => {
    const response = await api.post('/domain-pages', { domain });
    return response.data;
};

export const domainBacklinkAnalysis = async (domain) => {
    const response = await api.post('/domain-backlinks', { domain });
    return response.data;
};

export const keywordData = async (keyword) => {
    const response = await api.post('/keyword-data', { keyword });
    return response.data;
};

export const domainAnalysis = async (domain) => {
    const response = await api.post('/domain-analysis', { domain });
    return response.data;
};

export const getUserScrapedSites = async () => {
    const response = await api.get('/scraped-sites');
    return response.data;
};

export default api;
