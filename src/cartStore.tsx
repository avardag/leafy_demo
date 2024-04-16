import { useState } from "react";
import { CartContext } from "./context/CartContext";
import { ICartItem, IProduct } from "./shared/types";

interface CartStoreProviderProps {
  children: JSX.Element | JSX.Element[];
  //children: React.ReactNode
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [salladForDrinkRecommendation, setSalladForDrinkRecommendation] =
    useState<IProduct | null>(null);

  const addItemToCart = (product: IProduct) => {
    // Copy the current cart items
    const currentCartItems = [...cartItems];

    // Find the index of the product in the cart
    const existingCartItem = currentCartItems.find(
      (item) => item.product.id === product.id,
    );

    // If the product is already in the cart, update the quantity
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it
      currentCartItems.push({
        product,
        quantity: 1,
      });
    }

    // Update the cart items
    setCartItems(currentCartItems);
  };

  const removeItemFromCart = (product: IProduct) => {
    // make a copy of the cart items
    const currentCartItems = [...cartItems];

    // find the index of the product in the cart
    const existingCartItem = currentCartItems.find(
      (item) => item.product.id === product.id,
    );

    // if the product exists in the cart
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        // minus quantity by one
        existingCartItem.quantity -= 1;
      } else {
        // remove the whole cart item
        currentCartItems.splice(currentCartItems.indexOf(existingCartItem), 1);
      }
    } else {
      throw new Error("removeFromCart: Product does not exist.");
    }

    setCartItems(currentCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        salladForDrinkRecommendation,
        setSalladForDrinkRecommendation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
