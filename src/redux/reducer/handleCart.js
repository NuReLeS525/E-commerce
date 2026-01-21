const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Convert IDs to numbers for proper comparison
      const productId = Number(product.id);
      const exist = state.find((x) => Number(x.id) === productId);
      if (exist) {
        updatedCart = state.map((x) =>
          Number(x.id) === productId ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product, id: productId, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const delProductId = Number(product.id);
      const exist2 = state.find((x) => Number(x.id) === delProductId);
      if (!exist2) return state;
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => Number(x.id) !== delProductId);
      } else {
        updatedCart = state.map((x) =>
          Number(x.id) === delProductId ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "CLEARCART":
      localStorage.removeItem("cart");
      return [];

    default:
      return state;
  }
};

export default handleCart;
