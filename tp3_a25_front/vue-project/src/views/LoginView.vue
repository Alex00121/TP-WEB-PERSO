<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Connexion</h1>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" class="login-btn">
          Se connecter
        </button>

        <p v-if="error" class="error">
          {{ error }}
        </p>
      </form>

      <div class="signup-zone horizontal">
        <p>Pas encore de compte ?</p>
        <RouterLink to="/signup" class="signup-link">
          S’inscrire
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, RouterLink } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(null);

const auth = useAuthStore();
const router = useRouter();

async function handleLogin() {
  error.value = null;

  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (err) {
    error.value = err.message || "Erreur de connexion";
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: linear-gradient(120deg, #2c7be5, #5fa8d3);
}

.login-card {
  background: white;
  padding: 35px;
  width: 100%;
  max-width: 380px;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.login-card h1 {
  margin-bottom: 25px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.login-btn {
  margin-top: 10px;
  padding: 10px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.login-btn:hover {
  opacity: 0.9;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.signup-zone {
  margin-top: 20px;
  font-size: 14px;
}

.signup-link {
  display: inline-block;
  margin-top: 5px;
  color: #2c7be5;
  text-decoration: none;
  font-weight: bold;
}

.signup-link:hover {
  text-decoration: underline;
}

.signup-zone.horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 14px;
}
</style>
