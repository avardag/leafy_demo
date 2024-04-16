import { createContext } from "react";
import { ICartItem, IProduct } from "../shared/types";

export interface ICartContext {
  cartItems: ICartItem[];
  setCartItems: (cartItems: ICartItem[]) => void;
  removeItemFromCart: (product: IProduct) => void;
  addItemToCart: (product: IProduct) => void;
  salladForDrinkRecommendation: IProduct | null;
  setSalladForDrinkRecommendation: (sallad: IProduct) => void;
}

export const CartContext = createContext<ICartContext | null>(null);
