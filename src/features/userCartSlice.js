import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";

const userCartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    taxAmount: 0,
    cartTotal: 0,
    order: {
      products: [],
      orderTotal: 0,
    },
  },
  reducers: {
    addToCart(state, action) {
      state.cart?.push(action.payload);
    },
    removeFromCart(state, action) {
      return {
        cart: [...state.cart.filter((filter) => filter.id !== action.payload)],
      };
    },
    resetCart(state) {
      state.cart = [];
    },
    incrementItem(state, action) {
      let itemId = action.payload;
      state.cart.forEach((prod) => {
        if (prod.id === itemId) {
          prod.qty++;
        }
      });
    },
    getSubtotal(state) {
      let total = state.cart?.reduce((cartTotal, cartItem) => {
        const { price, qty } = cartItem;
        const itemTotal = price * qty;

        cartTotal += itemTotal;

        return cartTotal;
      }, 0);
      let shippingCost = 14.99;
      state.total = total;
      state.taxAmount = state.total * 0.1;
      state.cartTotal = state.total + state.taxAmount;
      if (!auth.currentUser && state.cart?.length > 0) {
        state.cartTotal = state.total + state.taxAmount + shippingCost;
      }
    },
    promoCodeTotal(state) {
      let discountAmount = state.total * 0.2;
      state.cartTotal -= discountAmount;
    },
    updateQuantity(state, action) {
      let qtyAmount = action.payload.quantity;
      let currentProd = action.payload.productId;
      const item = state.cart?.find((product) => product.id === currentProd);
      item.qty = qtyAmount;
    },
    updateItemColor(state, action) {
      let color = action.payload.color;
      let prodId = action.payload.id;
      state.cart.forEach((prod) => {
        if (prod.id === prodId) {
          prod.color = color;
        }
      });
    },
    setOrder(state, action) {
      state.order.products = [];
      state.order.orderTotal = 0;
      state.order.products.push(action.payload.products);
      state.order.orderTotal += action.payload.orderTotal;
    },
  },
});

export const {
  addToCart,
  resetCart,
  removeFromCart,
  incrementItem,
  getSubtotal,
  promoCodeTotal,
  updateQuantity,
  updateItemColor,
  setOrder,
} = userCartSlice.actions;

export default userCartSlice.reducer;
