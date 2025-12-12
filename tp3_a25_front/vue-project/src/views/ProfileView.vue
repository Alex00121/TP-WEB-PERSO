<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1>Mon profil</h1>

      <div v-if="auth.user" class="profile-content">

        <div class="avatar-wrapper">
          <img v-if="auth.user.avatar" :src="auth.user.avatar" alt="Avatar" class="avatar" />
          <div v-else class="avatar-placeholder">
            {{ auth.user.first_name?.[0] }}{{ auth.user.last_name?.[0] }}
          </div>
        </div>

        <form @submit.prevent="updateProfile" class="form">
          <div class="form-group">
            <label>Nom d’utilisateur</label>
            <input :value="auth.user.username" disabled />
          </div>

          <div class="form-group">
            <label>Prénom</label>
            <input v-model="firstName" />
          </div>

          <div class="form-group">
            <label>Nom</label>
            <input v-model="lastName" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input :value="auth.user.email" disabled />
          </div>

          <div class="actions">
            <button type="submit" class="save">
              Mettre à jour
            </button>

            <button type="button" @click="deleteAccount" class="delete">
              Supprimer mon compte
            </button>
          </div>
        </form>

        <p v-if="success" class="success">
          {{ success }}
        </p>
        <p v-if="error" class="error">
          {{ error }}
        </p>
      </div>
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

    success.value = "Profil mis à jour";
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
    alert("Compte supprimé");
    window.location.href = "/login";
  } catch (err) {
    alert(err.message || "Erreur lors de la suppression du compte");
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.profile-card {
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.profile-card h1 {
  text-align: center;
  margin-bottom: 30px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-wrapper {
  margin-bottom: 25px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #2c7be5;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #2c7be5;
  color: white;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.form {
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save {
  background: #2c7be5;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

.save:hover {
  opacity: 0.85;
}

.delete {
  background: red;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
}

.delete:hover {
  opacity: 0.85;
}

.success {
  color: green;
  text-align: center;
  margin-top: 15px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
