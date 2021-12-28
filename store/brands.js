export const state = () => ({
  brands: [],
});

export const mutations = {
  setBrands(state, brands) {
    state.brands = brands;
  },
  loadingBrands(state, payload) {
    state.brands = payload;
  },
};

export const actions = {
  async getBrands({ commit }) {
    const brands = await this.$axios.$get(
      'https://raw.githubusercontent.com/fe-side/vue-test/master/assets/brands.json'
    );
    commit('setBrands', brands);
  },
  loadingBrandsFromLocalStorage({ commit }, payload) {
    commit('loadingBrands', payload);
  },
};

export const getters = {
  getBrands(state) {
    return state.brands;
  },
};
