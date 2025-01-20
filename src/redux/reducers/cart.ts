import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, ProductProps } from "../../utils/interface";

const persistedCart = JSON.parse(localStorage.getItem("cart") || "{}");

const initialState: CartState = {
  items: Array.isArray(persistedCart.items) ? persistedCart.items : [],
  total_price:
    typeof persistedCart.total_price === "number"
      ? persistedCart.total_price
      : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ProductProps>) {
      if (action.payload.stock === 0) {
        return;
      }

      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push({ product: action.payload, quantity: 1 });
        state.total_price = state.items.reduce(
          (total, item) =>
            total + Number(item.product.final_price) * item.quantity,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; operation: "plus" | "minus" }>
    ) {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item && item.product.stock !== undefined) {
        if (
          action.payload.operation === "plus" &&
          item.quantity < item.product.stock
        ) {
          item.quantity += 1;
        } else if (action.payload.operation === "minus" && item.quantity > 1) {
          item.quantity -= 1;
        }

        state.total_price = state.items.reduce(
          (total, item) =>
            Math.round(
              total + Number(item.product.final_price) * item.quantity
            ),
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    modifyQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total_price = state.items.reduce(
          (total, item) =>
            Math.round(
              total + Number(item.product.final_price) * item.quantity
            ),
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total_price = state.items.reduce(
        (total, item) =>
          Math.round(total + Number(item.product.final_price) * item.quantity),
        0
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.total_price = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, removeItem, updateQuantity, modifyQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
