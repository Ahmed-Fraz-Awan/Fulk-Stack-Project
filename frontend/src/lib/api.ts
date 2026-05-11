import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const AI_URL = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:8000";

function createClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 20_000,
  });

  client.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sdt_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401 && typeof window !== "undefined") {
        localStorage.removeItem("sdt_token");
      }
      return Promise.reject(err);
    },
  );

  return client;
}

export const api = createClient(API_URL);
export const aiApi = createClient(AI_URL);

export const endpoints = {
  // auth
  login: "/auth/login",
  signup: "/auth/signup",
  me: "/auth/me",
  // analytics
  dashboard: "/analytics/dashboard",
  attendance: "/analytics/attendance",
  productivity: "/analytics/productivity",
  // ai
  predictBurnout: "/ai/burnout",
  predictPerformance: "/ai/performance",
  recommendations: "/ai/recommendations",
  // planner
  planner: "/planner",
  // mood
  mood: "/mood",
  // typing
  typing: "/typing",
  // admin
  admin: "/admin/students",
  notifications: "/notifications",
};
