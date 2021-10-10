export const state = () => ({
  order: [],
});

export const mutations = {
  add(state, product) {
    if (state.order.length) {
    } else {
    }
    state.order.push(product);
  },
  remove(state, product) {
    state.order.splice(state.order.indexOf(product), 1);
  },
};

export const getters = {
  productsOrder(state) {
    return state.order.length;
  },
  getProductsOrder(state) {
    function filterItems(query) {
      let newArray = [];
      query.forEach((each) => {
        if (!newArray.some((r) => r.id === each.id)) {
          let tmp = query.filter((item) => item.id === each.id);
          let product = Object.assign({}, each);
          product.qty = tmp.length;
          newArray.push(product);
        }
      });
      return newArray;
    }
    return filterItems(state.order);
  },
};
