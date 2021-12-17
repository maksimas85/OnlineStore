export const state = () => ({
  products: [],
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
};

export const actions = {
  async getProducts({ commit }) {
    const products = await this.$axios.$get(
      "https://raw.githubusercontent.com/fe-side/vue-test/master/assets/level3/products.json"
    );
    commit("setProducts", products);
  },
};

export const getters = {
  getProducts(state) {
    return state.products;
  },
};
