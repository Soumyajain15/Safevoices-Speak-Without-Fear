import axios from "axios";

// ✅ Base API URL
const API_BASE_URL = "http://localhost:5000/api";

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

// =========================
// 🧠 COUNSELING APIs
// =========================

export const getCounselors = async () => {
  const response = await api.get("/counseling/counselors");
  return response.data;
};

export const bookSession = async (sessionData) => {
  const response = await api.post("/counseling/book-session", sessionData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await api.post("/counseling/feedback", feedbackData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getAvailableSessions = async () => {
  const response = await api.get("/counseling/available-sessions");
  return response.data;
};

// =========================
// 🎯 REPORT APIs
// =========================

export const submitIncidentReport = async (formData) => {
  const response = await api.post("/report/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getIncidentCategories = async () => {
  const response = await api.get("/report/categories");
  return response.data;
};

// =========================
// 🗣️ COMMUNITY FORUM APIs
// =========================

export const getCommunityPosts = async () => {
  const response = await api.get("/community/posts");
  return response.data;
};

export const createCommunityPost = async (postData) => {
  const response = await api.post("/community/create-post", postData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const addCommentToPost = async (postId, commentData) => {
  const response = await api.post(`/community/add-comment/${postId}`, commentData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteCommunityPost = async (postId) => {
  const response = await api.delete(`/community/delete-post/${postId}`);
  return response.data;
};

// =========================
// 🔐 AUTH APIs
// =========================
export const getIncidentReports = async () => {
  const response = await api.get("/report/all");
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export default api;
