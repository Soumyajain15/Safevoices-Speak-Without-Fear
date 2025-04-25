import axios from "axios";

// ✅ Base API URL - Make sure this matches your backend
const API_BASE_URL = "http://localhost:5000/api";

// ✅ Axios instance for API calls (NO global headers here!)
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Interceptor for consistent error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "An unknown error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(errorMessage);
  }
);

// =========================
// 🧠 COUNSELING APIs
// =========================

export const getCounselors = async () => {
  try {
    const response = await api.get("/counseling/counselors");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch counselors: " + error.message);
  }
};

export const bookSession = async (sessionData) => {
  try {
    const response = await api.post("/counseling/book-session", sessionData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to book session");
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post("/counseling/feedback", feedbackData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to submit feedback");
  }
};

export const getAvailableSessions = async () => {
  try {
    const response = await api.get("/counseling/available-sessions");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch available sessions: " + error.message);
  }
};

// =========================
// 🎯 REPORT APIs
// =========================

export const submitIncidentReport = async (formData) => {
  try {
    const response = await api.post("/report/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit report: " + error.message);
  }
};

export const getIncidentCategories = async () => {
  try {
    const response = await api.get("/report/categories");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

// =========================
// 🗣️ COMMUNITY FORUM APIs
// =========================

export const getCommunityPosts = async () => {
  try {
    const response = await api.get("/community/posts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
};

export const createCommunityPost = async (postData) => {
  try {
    const response = await api.post("/community/create-post", postData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create post: " + error.message);
  }
};

export const addCommentToPost = async (postId, commentData) => {
  try {
    const response = await api.post(`/community/add-comment/${postId}`, commentData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add comment: " + error.message);
  }
};

export const deleteCommunityPost = async (postId) => {
  try {
    const response = await api.delete(`/community/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete post: " + error.message);
  }
};

// =========================
// 🔐 AUTH APIs (Optional)
// =========================

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

export default api;
