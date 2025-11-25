import axios from "axios";
import { API_BASE } from "../config";

export const signup = (payload: any) =>
  axios.post(`${API_BASE}/signup`, payload);

export const login = (payload: any) =>
  axios.post(`${API_BASE}/login`, payload);

export const saveToken = (token: string) =>
  localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
