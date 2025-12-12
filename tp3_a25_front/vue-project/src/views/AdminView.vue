<template>
  <div>
    <h1>Administration</h1>

    <h2>Ajouter un livre</h2>

    <form @submit.prevent="addBook">
      <div>
        <label>Titre</label>
        <input v-model="titre" required />
      </div>

      <div>
        <label>ISBN</label>
        <input v-model="isbn" required />
      </div>

      <div>
        <label>Auteur</label>
        <select v-model="selectedAuteur" required>
          <option disabled value="">-- Choisir un auteur --</option>
          <option v-for="aut in auteurs" :key="aut._id" :value="aut._id">
            {{ aut.nom }}
          </option>
        </select>
      </div>


      <div>
        <div>
          <label>Catégorie</label>
          <select v-model="selectedCategorie" required>
            <option disabled value="">-- Choisir une catégorie --</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.nom }}
            </option>
          </select>
        </div>

      </div>

      <div>
        <label>Prix</label>
        <input v-model.number="prix" type="number" step="0.01" required />
      </div>

      <div>
        <label>Stock</label>
        <input v-model.number="stock" type="number" required />
      </div>

      <div>
        <label>Image (URL)</label>
        <input v-model="image" />
      </div>

      <button type="submit">
        {{ editingBookId ? "Enregistrer les modifications" : "Ajouter le livre" }}
      </button>

    </form>
    <hr />

    <h2>Liste des livres</h2>

    <p v-if="loading">Chargement des livres...</p>

    <ul v-if="!loading">
      <li v-for="book in livres" :key="book._id">
        {{ book.titre }} — {{ book.prix }} $ — Stock : {{ book.stock }}

        <button @click="editBook(book)" style="margin-left: 10px;">
          Modifier
        </button>

        <button @click="deleteBook(book._id)" style="margin-left: 10px; color: red;">
          Supprimer
        </button>
      </li>

    </ul>


    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch } from "../utils/apiFetch";
import { onMounted } from "vue";

const categories = ref([]);
const selectedCategorie = ref("");
const auteurs = ref([]);
const selectedAuteur = ref("");
const editingBookId = ref(null);

const livres = ref([]);
const loading = ref(false);

const titre = ref("");
const isbn = ref("");
const auteur = ref("");
const categorie = ref("");
const prix = ref(0);
const stock = ref(0);
const image = ref("");

const success = ref(null);
const error = ref(null);

async function addBook() {
  success.value = null;
  error.value = null;

  const payload = {
    titre: titre.value,
    isbn: isbn.value,
    auteurs: [selectedAuteur.value],
    categories: [selectedCategorie.value],
    prix: prix.value,
    quantite: stock.value,
    image: image.value,
  };

  try {
    if (editingBookId.value) {
      await apiFetch(`/api/livres/${editingBookId.value}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      success.value = "Livre modifié";
    } else {
      await apiFetch("/api/livres", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      success.value = "Livre ajouté";
    }
    titre.value = "";
    isbn.value = "";
    prix.value = 0;
    stock.value = 0;
    image.value = "";
    selectedAuteur.value = "";
    selectedCategorie.value = "";
    editingBookId.value = null;

    fetchAdminBooks();
  } catch (err) {
    error.value = err.message || "Erreur lors de l'opération";
  }
}

async function fetchCategories() {
  try {
    const data = await apiFetch("/api/categories");
    categories.value = data;
  } catch (e) {
    console.error("Erreur chargement catégories", e);
  }
}
onMounted(() => {
  fetchCategories();
  fetchAuteurs();
  fetchAdminBooks();

});


async function fetchAuteurs() {
  try {
    const data = await apiFetch("/api/auteurs");
    auteurs.value = data;
  } catch (e) {
    console.error("Erreur chargement auteurs", e);
  }
}
async function fetchAdminBooks() {
  loading.value = true;
  try {
    const data = await apiFetch("/api/livres");
    livres.value = data.data;
  } catch (e) {
    console.error("Erreur chargement livres admin", e);
  } finally {
    loading.value = false;
  }
}
async function deleteBook(bookId) {
  const confirmDelete = confirm("Supprimer ce livre ?");

  if (!confirmDelete) return;

  try {
    await apiFetch(`/api/livres/${bookId}`, {
      method: "DELETE",
    });

    fetchAdminBooks();
  } catch (e) {
    alert("Erreur lors de la suppression");
  }
}
function editBook(book) {
  console.log("BOOK REÇU:", book);
  editingBookId.value = book._id;

  titre.value = book.titre;
  isbn.value = book.isbn;
  prix.value = book.prix;
  stock.value = Number(book.quantite);


  image.value = book.image || "";

  selectedCategorie.value = book.categories?.[0]?._id || "";
  selectedAuteur.value = book.auteurs?.[0]?._id || "";
}


</script>
