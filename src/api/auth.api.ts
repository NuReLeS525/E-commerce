import { http } from "./http";

export const authApi = {
  login(username: string, password: string) {
    return http.post("/api/v1/admin/login", {
      username,
      password,
    });
  },

  logout() {
    return http.post("/api/v1/admin/logout");
  },
};
