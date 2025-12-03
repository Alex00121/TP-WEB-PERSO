<template>
  <div class="page">
 <div class="main-container">
    <!-- ✅ HEADER -->
    <header class="header">
      <h1>Catalogue de livres</h1>
    
    </header>

    <!-- ✅ BARRE DE RECHERCHE (EN HAUT À GAUCHE) -->
    <div class="search-container">
      <input
        v-model="search"
        placeholder="Rechercher un livre..."
      />
      <button @click="handleSearch">Rechercher</button>
    </div>

    <!-- ✅ CONTENU -->
    <section>

      <p v-if="booksStore.loading" class="center">
        Chargement des livres...
      </p>

      <p v-if="booksStore.error" class="error">
        {{ booksStore.error }}
      </p>

      <p
        v-if="!booksStore.loading && booksStore.books.length === 0"
        class="center"
      >
        Aucun livre trouvé.
      </p>

      <!-- ✅ GRID CENTRÉ -->
      <div class="grid-wrapper">
        <div class="grid">

          <div
            v-for="book in booksStore.books"
            :key="book._id"
            class="card"
          >
            <img
              :src="book.couverture || '/book-placeholder.png'"
              class="book-image"
            />

            <h3>{{ book.titre }}</h3>

           <span
  class="badge-rupture"
  :style="{ visibility: book.quantite === 0 ? 'visible' : 'hidden' }"
>
  Rupture de stock
</span>


            <p v-if="book.auteurs?.length">
              <strong>Auteur :</strong>
              {{ book.auteurs.map(a => a.nom).join(", ") }}
            </p>

            <p><strong>Prix :</strong> {{ book.prix }} $</p>
            <p><strong>quantite :</strong> {{ book.quantite }}</p>

            <button
              :disabled="book.quantite === 0"
              @click="addToCart(book._id)"
            >
              Ajouter au panier
            </button>

          </div>
        </div>
      </div>

      <!-- ✅ PAGINATION -->
      <div
        v-if="booksStore.pagination"
        class="pagination"
      >
        <button
          :disabled="booksStore.pagination.page <= 1"
          @click="changePage(booksStore.pagination.page - 1)"
        >
          Page précédente
        </button>

        <span>
          Page {{ booksStore.pagination.page }}
          sur {{ booksStore.pagination.totalPages }}
        </span>

        <button
          :disabled="
            booksStore.pagination.page >=
            booksStore.pagination.totalPages
          "
          @click="changePage(booksStore.pagination.page + 1)"
        >
          Page suivante
        </button> 
      </div>

    </section>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBooksStore } from "../stores/books";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";

const booksStore = useBooksStore();
const cartStore = useCartStore();
const auth = useAuthStore();
const router = useRouter();

const search = ref("");

onMounted(() => {
  booksStore.fetchBooks(1);
});

function handleLogout() {
  auth.logout();
  router.push("/login");
}

function changePage(page) {
  booksStore.fetchBooks(page);
}

function handleSearch() {
  if (!search.value.trim()) {
    booksStore.fetchBooks(1);
    return;
  }
  booksStore.searchBooks(search.value);
}

async function addToCart(bookId) {
  try {
    await cartStore.addItem(bookId, 1);
    alert("Livre ajouté au panier ✅");
  } catch {
    alert("Erreur lors de l'ajout au panier ❌");
  }
}
</script>

<style scoped>
/* ✅ PAGE */
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
/* ✅ CONTAINER PRINCIPAL ALIGNÉ */
.main-container {
  max-width: 1030px;
  margin: 0 auto;
}


/* ✅ HEADER */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}




.header button {
  padding: 8px 14px;
}

/* ✅ SEARCH (EN HAUT À GAUCHE) */
.search-container {
  display: flex;
 
  margin-bottom: 30px;
}

.search-container input {
  padding: 8px;
  width: 240px;
}

/* ✅ CENTRAGE GLOBAL GRID */
/* ✅ CENTRAGE GLOBAL GRID */
.grid-wrapper {
  display: flex;
  justify-content: center;
}

/* ✅ GRID FIXE À 3 COLONNES */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 220px); /* ✅ 3 cartes par ligne */
  gap: 50px;
  justify-content: center;
}

/* ✅ CARD */
/* ✅ CARD */
.card {
  width: 220px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background: white;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Titre, image, bouton restent centrés */
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
/* ✅ INFOS ALIGNÉES À GAUCHE + POLICE PLUS PETITE */
.card p {
  width: 100%;
  text-align: left;      /* ✅ Aligné à gauche */
  font-size: 13px;       /* ✅ Police réduite */
  margin: 4px 0;
}

.card h3 {
  font-size: 16px;       /* ✅ Titre légèrement réduit */
  text-align: center;
  margin-bottom: 6px;
}


/* ✅ IMAGE */
.book-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

/* ✅ BADGE */
.badge-rupture {
  display: inline-block;
  background: red;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 5px;
  margin-bottom: 8px;
}

/* ✅ ZONE RÉSERVÉE POUR LE BADGE (MÊME QUAND IL N’EXISTE PAS) */


/* ✅ BUTTON */
.card button {
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  background: #2c7be5;
  color: white;
  cursor: pointer;
}

.card button:disabled {
  background: gray;
  cursor: not-allowed;
}

/* ✅ PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 40px;
}

/* ✅ TEXTE */
.center {
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
