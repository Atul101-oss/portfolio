// API Configuration
// Update these values when your Django backend is ready

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Projects
  projects: `${API_BASE_URL}/projects/`,
  projectDetail: (id: number) => `${API_BASE_URL}/projects/${id}/`,
  
  // Contact
  contact: `${API_BASE_URL}/contact/`,
  
  // Additional endpoints for future features
  // skills: `${API_BASE_URL}/skills/`,
  // experience: `${API_BASE_URL}/experience/`,
  // education: `${API_BASE_URL}/education/`,
};

// API Helper Functions
export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  
  post: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  
  put: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  
  delete: async (url: string) => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
};
