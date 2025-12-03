<template>
  <div class="cart-container">
    <h1>🛒 Mon panier</h1>

    <!-- Chargement -->
    <p v-if="cartStore.loading && !cartStore.cart" class="center">
      Chargement du panier...
    </p>

    <!-- Erreur -->
    <p v-if="cartStore.error" class="error">
      {{ cartStore.error }}
    </p>

    <!-- Panier vide -->
    <div
      v-if="!cartStore.loading && cartStore.cart && cartStore.cart.items.length === 0"
      class="empty"
    >
      Ton panier est vide 🛒
    </div>

    <!-- Liste des items -->
  <!-- Liste des items -->
<div
  v-if="cartStore.cart && cartStore.cart.items && cartStore.cart.items.length > 0"
  class="items"
>
  <div
    v-for="item in cartStore.cart.items"
    :key="item._id"
    class="item-card"
  >
    <!-- IMAGE (si pas peuplé → placeholder direct) -->
    <img
      :src="item.livre?.couverture || '/book-placeholder.png'"
      class="item-image"
    />

    <!-- INFOS -->
    <div class="item-info">
      <h3>
        {{ item.livre?.titre || "Livre supprimé" }}
      </h3>

      <p>
        {{ item.quantite }} x
        {{ item.livre?.prix ?? 0 }} $
      </p>
    </div>

    <!-- ACTION -->
    <button
      class="delete"
      @click="removeItem(item.livre?._id || item.livre)"
    >
      ✖
    </button>
  </div>
</div>


    <!-- Total -->
    <div v-if="cartStore.cart && cartStore.cart.items.length > 0" class="total-box">
      <p>
        <strong>Total :</strong> {{ cartStore.cart.total }} $
      </p>

      <button class="clear" @click="clearCart">
        Vider le panier
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});

async function removeItem(livreId) {
  try {
    await cartStore.removeItem(livreId);
  } catch {
    alert("Erreur lors de la suppression");
  }
}

async function clearCart() {
  try {
    await cartStore.clearCart();
  } catch {
    alert("Erreur lors du vidage du panier");
  }
}
</script>

<style scoped>
/* ✅ CONTENEUR */
.cart-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

/* ✅ TITRE */
h1 {
  text-align: center;
  margin-bottom: 30px;
}

/* ✅ CENTRAGE */
.center {
  text-align: center;
}

/* ✅ ERREUR */
.error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

/* ✅ PANIER VIDE */
.empty {
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
}

/* ✅ LISTE DES ITEMS */
.items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* ✅ CARTE ITEM */
.item-card {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* ✅ IMAGE */
.item-image {
  width: 70px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

/* ✅ INFOS */
.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

/* ✅ SUPPRIMER */
.delete {
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.delete:hover {
  opacity: 0.85;
}

/* ✅ TOTAL */
.total-box {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-box p {
  font-size: 18px;
  font-weight: bold;
}

/* ✅ BOUTON VIDER */
.clear {
  background: #222;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.clear:hover {
  opacity: 0.85;
}
</style>
