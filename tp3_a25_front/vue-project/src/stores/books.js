import { defineStore } from "pinia";
import { apiFetch } from "@/utils/apiFetch";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    pagination: null,
    loading: false,
    error: null,
  }),

  actions: {
  async fetchBooks(page = 1) {
    this.loading = true;
    this.error = null;

    try {
      const data = await apiFetch(`/api/livres?page=${page}`);
      this.books = data.data;
      this.pagination = data.pagination;
    } catch (err) {
      this.error = err.message || "Erreur lors du chargement des livres";
    } finally {
      this.loading = false;
    }
  },
  async searchBooks(query) {
  this.loading = true;
  this.error = null;

  try {
    const data = await apiFetch(`/api/livres/search?q=${query}`);
    this.books = data;
    this.pagination = null; 
  } catch (err) {
    this.error = err.message || "Erreur lors de la recherche";
  } finally {
    this.loading = false;
  }
},

},

});
