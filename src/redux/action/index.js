// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item from Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

// For Clear Cart (on logout)
export const clearCart = () => {
  return {
    type: "CLEARCART",
  };
};