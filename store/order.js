export const state = () => ({
  cart: [],
});

export const mutations = {
  add(state, product) {
    state.cart.push(product);
  },
  removeProductFromCart(state, payload) {
    const index = state.cart.findIndex((item) => item.id === payload.id);
    return state.cart.splice(index, payload.qty);
  },
};

export const actions = {
  removeFromCart({ commit }, payload) {
    commit("removeProductFromCart", payload);
  },
  addProductInCart({ commit }, product) {
    commit("add", product);
  },
};

export const getters = {
  productsCart(state) {
    return state.cart.length;
  },
  getProductsCart(state) {
    return state.cart;
  },
};
