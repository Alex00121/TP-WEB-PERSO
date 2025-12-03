import { defineStore } from "pinia";
import { apiFetch } from "@/utils/apiFetch";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: { items: [], total: 0 },
    loading: false,
    error: null,
  }),

  actions: {
  async fetchCart() {
  this.loading = true;
  this.error = null;

  try {
    const data = await apiFetch("/api/panier");

    // ✅ ASSIGNATION DU PANIER
    this.cart = data;

    // ✅ NETTOYAGE DES ITEMS CASSÉS (livres supprimés)
    this.cart.items = this.cart.items?.filter(i => i.livre);

  } catch (err) {
    this.error = err.message || "Erreur lors du chargement du panier";
  } finally {
    this.loading = false;
  }
}
,

  async addItem(livreId, quantite = 1) {
  this.loading = true;
  this.error = null;

  try {
    // ✅ S'assurer que le panier est chargé
    if (!this.cart) {
      await this.fetchCart();
    }

    // ✅ Vérifier si le livre est déjà dans le panier
    const existingItem = this.cart?.items?.find(
      item => item.livre && item.livre._id === livreId
    );

    const newQuantite = existingItem
      ? existingItem.quantite + quantite
      : quantite;

    // ✅ On envoie toujours la QUANTITÉ TOTALE
    await apiFetch("/api/panier", {
      method: "POST",
      body: JSON.stringify({
        livreId,
        quantite: newQuantite,
      }),
    });

    // ✅ Recharger le panier après mise à jour
    await this.fetchCart();

  } catch (err) {
    this.error = err.message || "Erreur lors de l'ajout au panier";
  } finally {
    this.loading = false;
  }
}


,
  async removeItem(livreId) {
  this.loading = true;
  this.error = null;

  try {
    const data = await apiFetch(`/api/panier/items/${livreId}`, {
      method: "DELETE",
    });

    
    this.cart = data;
  } catch (err) {
    this.error = err.message || "Erreur lors de la suppression";
    throw err;
  } finally {
    this.loading = false;
  }
},
async clearCart() {
  this.loading = true;
  this.error = null;

  try {
    const data = await apiFetch("/api/panier", {
      method: "DELETE",
    });

   
    this.cart = data;
  } catch (err) {
    this.error = err.message || "Erreur lors du vidage du panier";
    throw err;
  } finally {
    this.loading = false;
  }
},


},


});
