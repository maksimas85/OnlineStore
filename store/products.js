export const state = () => ({
  products: [],
  isLoading: false,
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setIsLoading(state) {
    state.isLoading = true;
  },
};

export const actions = {
  async getProducts({ commit }) {
    const products = await this.$axios.$get(
      'https://raw.githubusercontent.com/fe-side/vue-test/master/assets/level3/products.json'
    );
    commit('setProducts', products);
    commit('setIsLoading');
  },
};

export const getters = {
  getProducts(state) {
    return state.products;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
};
