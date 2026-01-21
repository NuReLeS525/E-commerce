import axios from "axios";

const apiPublic = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

export const createAuthenticatedApi = (accessToken) => {
  return axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default apiPublic;