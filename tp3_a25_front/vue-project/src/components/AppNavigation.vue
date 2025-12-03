<template>
  <nav class="nav">
    <div class="nav-container">
      <!-- LOGO / TITRE -->
      <div class="logo">
        📚 Etcaetera
      </div>

      <!-- LIENS -->
      <div class="links">
        <RouterLink to="/" class="link">Accueil</RouterLink>
        <RouterLink to="/panier" class="link">Panier</RouterLink>
        <RouterLink to="/profil" class="link">Profil</RouterLink>

        <RouterLink
          v-if="auth.user?.is_admin"
          to="/admin"
          class="link admin"
        >
          Admin
        </RouterLink>

        <button @click="logout" class="logout">
          Déconnexion
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<style scoped>
/* ✅ NAVBAR GLOBALE */
.nav {
  background: linear-gradient(135deg, #2c7be5, #1a4fd8);
  padding: 14px 0;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* ✅ CONTENEUR CENTRÉ */
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ✅ LOGO */
.logo {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

/* ✅ LIENS */
.links {
  display: flex;
  gap: 18px;
  align-items: center;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* ✅ Hover des liens */
.link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

/* ✅ Lien actif */
.router-link-active {
  border-bottom: 2px solid white;
}

/* ✅ Badge Admin */
.admin {
  background: gold;
  color: #1a4fd8;
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: bold;
}

/* ✅ Bouton Déconnexion */
.logout {
  background: red;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.logout:hover {
  opacity: 0.85;
  transform: scale(1.05);
}
</style>
