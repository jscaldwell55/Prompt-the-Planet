import api from './api';

export const getPrompts = async () => {
  const response = await api.get('/prompts');
  return response.data;
};

export const getPromptById = async (id) => {
  const response = await api.get(`/prompts/${id}`);
  return response.data;
};

export const createPrompt = async (promptData) => {
  const response = await api.post('/prompts', promptData);
  return response.data;
};

export const updatePrompt = async (id, promptData) => {
  const response = await api.put(`/prompts/${id}`, promptData);
  return response.data;
};

export const deletePrompt = async (id) => {
  const response = await api.delete(`/prompts/${id}`);
  return response.data;
};

export const votePrompt = async (id, voteType) => {
  const response = await api.post(`/prompts/${id}/vote`, { voteType });
  return response.data;
};

export const searchPrompts = async (query, tags) => {
  let url = '/search?';
  if (query) url += `query=${query}&`;
  if (tags) url += `tags=${tags}`;
  
  const response = await api.get(url);
  return response.data;
};cd