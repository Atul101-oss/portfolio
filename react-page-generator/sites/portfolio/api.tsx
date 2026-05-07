// api.tsx

// Toggle between local and production URLs
export const Host = process.env.NODE_ENV === "production"
  ? "https://online-server-address" // Replace with your actual production URL
  : "http://127.0.0.1:8000";

export const API_BASE = `${Host}/api/v1`;
export const PROJECT_DETAIL = (id: number) => `${API_BASE}/project/${id}/`;
export const PROJECT_LIST = `${API_BASE}/projects_serializer/`;
