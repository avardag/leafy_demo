import { useContext } from "react";
import { CartContext, ICartContext } from "../context/CartContext";

const useCart = () => {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    salladForDrinkRecommendation,
    setSalladForDrinkRecommendation,
  } = useContext(CartContext) as ICartContext;

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    salladForDrinkRecommendation,
    setSalladForDrinkRecommendation,
  };
};

export default useCart;
