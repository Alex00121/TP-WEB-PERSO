<template>
  <div>
    <h1>Mon profil</h1>

    <div v-if="auth.user">
      <form @submit.prevent="updateProfile">
        <div>
          <label>Username</label>
          <input :value="auth.user.username" disabled />
        </div>

        <div>
          <label>Prénom</label>
          <input v-model="firstName" />
        </div>

        <div>
          <label>Nom</label>
          <input v-model="lastName" />
        </div>

        <div>
          <label>Email</label>
          <input :value="auth.user.email" disabled />
        </div>

        <button type="submit">Mettre à jour</button>

        <button
          type="button"
          @click="deleteAccount"
          style="margin-left: 10px; color: red;"
        >
          Supprimer mon compte
        </button>
      </form>

      <p v-if="success" style="color: green">{{ success }}</p>
      <p v-if="error" style="color: red">{{ error }}</p>

      <img
        v-if="auth.user.avatar"
        :src="auth.user.avatar"
        alt="Avatar"
        width="120"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { apiFetch } from "../utils/apiFetch";

const auth = useAuthStore();

const firstName = ref(auth.user.first_name);
const lastName = ref(auth.user.last_name);

const success = ref(null);
const error = ref(null);

async function updateProfile() {
  success.value = null;
  error.value = null;

  try {
    const data = await apiFetch("/api/users/profile", {
      method: "PUT",
      body: JSON.stringify({
        first_name: firstName.value,
        last_name: lastName.value,
      }),
    });

    auth.user = data;
    localStorage.setItem("user", JSON.stringify(data));

    success.value = "Profil mis à jour ✅";
  } catch (err) {
    error.value = err.message || "Erreur lors de la mise à jour";
  }
}

async function deleteAccount() {
  const confirmDelete = confirm(
    "Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible."
  );

  if (!confirmDelete) return;

  try {
    await apiFetch("/api/users/profile", {
      method: "DELETE",
    });

    auth.logout();
    alert("Compte supprimé ✅");
    window.location.href = "/login";
  } catch (err) {
    alert(err.message || "Erreur lors de la suppression du compte");
  }
}
</script>
