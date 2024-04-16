import { categoryPrices } from "../shared/enums";
import { Drink, IProduct, IRecipe } from "../shared/types";

export function recipeToProductDto(recipe: IRecipe): IProduct {
  return {
    title: recipe.title,
    id: recipe._id,
    price: recipe.price,
    imageUrl: recipe.imageUrl,
  };
}

export function drinkToProductDto(drink: Drink): IProduct {
  return {
    title: drink.strDrink,
    id: drink.idDrink,
    price: 0,
    imageUrl: drink.strDrinkThumb,
  };
}

export function drinkToProductDtoWithPrice(drink: Drink): IProduct {
  return {
    title: drink.strDrink,
    id: drink.idDrink,
    price: categoryPrices[drink.strCategory],
    imageUrl: drink.strDrinkThumb,
  };
}
