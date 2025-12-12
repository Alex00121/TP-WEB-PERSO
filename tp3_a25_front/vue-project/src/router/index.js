import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/panier",
      name: "cart",
      component: () => import("../views/CartView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profil",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: { requiresAuth: true },
    },



  ],
});

import { useAuthStore } from "@/stores/auth";

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();


  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});


export default router;
