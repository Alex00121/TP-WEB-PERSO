<template>
  <div class="cart-container">
    <h1>Mon panier</h1>

    <p v-if="cartStore.loading && !cartStore.cart" class="center">
      Chargement du panier...
    </p>

    <p v-if="cartStore.error" class="error">
      {{ cartStore.error }}
    </p>

    <div v-if="!cartStore.loading && cartStore.cart && cartStore.cart.items.length === 0" class="empty">
      Ton panier est vide
    </div>

    <div v-if="cartStore.cart && cartStore.cart.items && cartStore.cart.items.length > 0" class="items">
      <div v-for="item in cartStore.cart.items" :key="item._id" class="item-card">

        <img :src="item.livre?.couverture || '/book-placeholder.png'" class="item-image" />

        <div class="item-info">
          <h3>
            {{ item.livre?.titre || "Livre supprimé" }}
          </h3>

          <p>
            {{ item.quantite }} x
            {{ item.livre?.prix ?? 0 }} $
          </p>
        </div>
        <button class="delete" @click="removeItem(item.livre?._id || item.livre)">
          ✖
        </button>
      </div>
    </div>
    <div v-if="cartStore.cart && cartStore.cart.items.length > 0" class="total-box">
      <p>
        <strong>Total :</strong> {{ formattedTotal }} $
      </p>

      <button class="clear" @click="clearCart">
        Vider le panier
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

const formattedTotal = computed(() => {
  return cartStore.cart
    ? Number(cartStore.cart.total).toFixed(2)
    : "0.00";
});


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
.cart-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.center {
  text-align: center;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

.empty {
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

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

.item-image {
  width: 70px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

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
