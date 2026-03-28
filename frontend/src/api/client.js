import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Pitch API
export const pitchAPI = {
  transform: async (pitch) => {
    const response = await api.post('/pitch/transform', { pitch });
    return response.data;
  },
  getProject: async (projectId) => {
    const response = await api.get(`/pitch/${projectId}`);
    return response.data;
  }
};

// History API
export const historyAPI = {
  list: async () => {
    const response = await api.get('/history');
    return response.data;
  },
  save: async (data) => {
    const response = await api.post('/history', data);
    return response.data;
  },
  delete: async (entryId) => {
    const response = await api.delete(`/history/${entryId}`);
    return response.data;
  },
  replay: async (entryId) => {
    const response = await api.get(`/history/${entryId}/replay`);
    return response.data;
  }
};

// Download API
export const downloadAPI = {
  download: async (projectId) => {
    const response = await api.get(`/download/${projectId}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default api;