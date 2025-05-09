// API base URL - this should point to your Express backend
const API_URL = 'http://localhost:5000/api';

// Function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// API Methods
export const api = {
  // Prompts
  getPrompts: async () => {
    const response = await fetch(`${API_URL}/prompts`);
    return handleResponse(response);
  },
  
  getPromptById: async (id) => {
    const response = await fetch(`${API_URL}/prompts/${id}`);
    return handleResponse(response);
  },
  
  createPrompt: async (promptData) => {
    const response = await fetch(`${API_URL}/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(promptData)
    });
    return handleResponse(response);
  },
  
  // Search
  searchPrompts: async (query, tags) => {
    let url = `${API_URL}/search?`;
    if (query) url += `query=${query}&`;
    if (tags) url += `tags=${tags}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },
  
  // Auth - to be implemented
  login: async () => {
    // This will redirect to Google OAuth
    window.location.href = `${API_URL}/auth/google`;
  }
};
