<template>
  <div>
    <h1>Inscription</h1>

    <form @submit.prevent="handleSignup">
      <div>
        <label>Nom d’utilisateur</label>
        <input v-model="username" required />
      </div>

      <div>
        <label>Prénom</label>
        <input v-model="first_name" required />
      </div>

      <div>
        <label>Nom</label>
        <input v-model="last_name" required />
      </div>

      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Mot de passe</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Créer le compte</button>

      <p v-if="error" style="color: red">{{ error }}</p>
      <p v-if="success" style="color: green">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter } from "vue-router";

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
    }, 1000);
  } catch (err) {
    error.value = err.message || "Erreur lors de l’inscription";
  }
}
</script>
