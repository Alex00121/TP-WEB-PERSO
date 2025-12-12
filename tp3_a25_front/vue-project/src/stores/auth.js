import { defineStore } from "pinia";
import { apiFetch } from "@/utils/apiFetch";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.is_admin === true,
  },

  actions: {
    initFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },

    async login(email, password) {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      this.token = data.token;
      this.user = data.user;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

  },
});
