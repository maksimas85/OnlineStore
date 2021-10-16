export const state = () => ({
  cart: [],
});

export const mutations = {
  loadingCart(state, payload) {
    state.cart = payload ? payload : [];
  },
  addProductInCart(state, product) {
    let foundProduct = state.cart.find((item) => item.id === product.id);
    if (foundProduct) {
      foundProduct.qty++;
    } else {
      this._vm.$set(product, "qty", 1);
      state.cart.push(product);
    }
  },
  removeFromCart(state, payload) {
    // state.cart.sort((a, b) => a.id - b.id);
    const index = state.cart.findIndex((item) => item.id === payload.id);
    return state.cart.splice(index, 1);
  },
  removeProductFromCart(state, payload) {
    const index = state.cart.findIndex((item) => item.id === payload.id);
    return state.cart.map((item, i) => {
      if (i === index) {
        item.qty--;
        if (!item.qty) {
          return state.cart.splice(index, 1);
        }
      }
    });
  },
};

export const actions = {
  removeFromCart({ commit }, payload) {
    commit("removeFromCart", payload);
  },
  removeProductFromCart({ commit }, payload) {
    commit("removeProductFromCart", payload);
  },
  addProductInCart({ commit }, product) {
    commit("addProductInCart", product);
  },
  loadingCartFromLocalStorage({ commit }, payload) {
    commit("loadingCart", payload);
  },
};

export const getters = {
  productsCartLength(state) {
    return state.cart.reduce((acc, item) => {
      return (acc += item.qty);
    }, 0);
  },
  getProductsCart(state) {
    return state.cart;
  },
};
