<template>
  <div class="signup-container">
    <div class="signup-card">
      <h1>Inscription</h1>

      <form @submit.prevent="handleSignup" class="form">
        <div class="form-group">
          <label>Nom d’utilisateur</label>
          <input v-model="username" required />
        </div>

        <div class="form-group">
          <label>Prénom</label>
          <input v-model="first_name" required />
        </div>

        <div class="form-group">
          <label>Nom</label>
          <input v-model="last_name" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" class="signup-btn">
          Créer le compte
        </button>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <p v-if="success" class="success">
          {{ success }}
        </p>
      </form>


      <div class="login-zone horizontal">
        <p>Déjà un compte ?</p>
        <RouterLink to="/login" class="login-link">
          Se connecter
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter, RouterLink } from "vue-router";

const username = ref("");
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");

const error = ref(null);
const success = ref(null);

const router = useRouter();

async function handleSignup() {
  error.value = null;
  success.value = null;

  try {
    await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      }),
    });

    success.value = "Compte créé avec succès";

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  } catch (err) {
    error.value = err.message || "Erreur lors de l’inscription";
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: linear-gradient(120deg, #2c7be5, #5fa8d3);
}


.signup-card {
  background: white;
  padding: 35px;
  width: 100%;
  max-width: 420px;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
}


.signup-card h1 {
  margin-bottom: 25px;
}


.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
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


.signup-btn {
  margin-top: 15px;
  padding: 10px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.signup-btn:hover {
  opacity: 0.9;
}


.error {
  color: red;
  margin-top: 12px;
  text-align: center;
}


.success {
  color: green;
  margin-top: 12px;
  text-align: center;
}

.login-zone {
  margin-top: 25px;
  font-size: 14px;
}

.login-link {
  display: inline-block;
  margin-top: 5px;
  color: #2c7be5;
  text-decoration: none;
  font-weight: bold;
}

.login-link:hover {
  text-decoration: underline;
}


.login-zone.horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 14px;
}
</style>
