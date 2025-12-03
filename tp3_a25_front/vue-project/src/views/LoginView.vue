<template>
  <div>
    <h1>Connexion</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Mot de passe</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Se connecter</button>

      <p v-if="error" style="color: red">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

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
