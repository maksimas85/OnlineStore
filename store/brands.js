export const state = () => ({
  brands: [],
});

export const mutations = {
  setBrands(state, brands) {
    state.brands = brands;
  },
};

export const actions = {
  async getBrands({ commit }) {
    const brands = await this.$axios.$get(
      "https://raw.githubusercontent.com/fe-side/vue-test/master/assets/brands.json"
    );
    commit("setBrands", brands);
  },
};

export const getters = {
  getBrands(state) {
    return state.brands;
  },
};
