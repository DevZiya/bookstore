import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : [],
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (find) => find.isbn13 === action.payload.isbn13
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].cartQuantity += 1;
      } else {
        const books = { ...action.payload, cartQuantity: 1 };
        state.carts.push(books);
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeFromCart: (state, action) => {
      let deletedCardItem = state.carts.find(
        (item) => item.isbn13 === action.payload.isbn13
      );
      let indexDeletedItem = state.carts.indexOf(deletedCardItem);

      state.carts.splice(indexDeletedItem, 1)
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    decresCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (find) => find.isbn13 === action.payload.isbn13
      );

      if (state.carts[itemIndex].cartQuantity > 1) {
        state.carts[itemIndex].cartQuantity -= 1;
      } else if (state.carts[itemIndex].cartQuantity === 1) {
        const newState = state.carts.filter(
          (cart) => cart.isbn13 !== action.payload.isbn13
        );
        state.carts = newState;
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    getTotals: (state) => {
      let { total } = state.carts.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity, price } = cartItem;
          let convertedPrice = Number(price.replace(/[^0-9.-]+/g, ""));
          const itemTotal = cartQuantity * convertedPrice;

          cartTotal.total += itemTotal;

          return cartTotal;
        },
        {
          total: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decresCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
