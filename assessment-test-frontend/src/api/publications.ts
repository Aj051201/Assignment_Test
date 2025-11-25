import axios from "axios";
import { API_BASE } from "../config";
import { authHeader } from "/Assessment/assessment-test-frontend/src/api/auth";

export const fetchPublications = () =>
  axios.get(`${API_BASE}/publications`, { headers: authHeader() });

export const fetchPublicPublished = () =>
  axios.get(`${API_BASE}/publications/public`);

export const createPublication = (data: any) =>
  axios.post(`${API_BASE}/publications`, { publication: data }, { headers: authHeader() });

export const updatePublication = (id: number, data: any) =>
  axios.patch(`${API_BASE}/publications/${id}`, { publication: data }, { headers: authHeader() });

export const deletePublication = (id: number) =>
  axios.delete(`${API_BASE}/publications/${id}`, { headers: authHeader() });
