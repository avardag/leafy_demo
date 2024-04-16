import { Drink, IProduct } from "../shared/types";

export function getRecommendedDrinkByProduct(
  product: IProduct,
  drinkArray: Drink[],
) {
  let recommendedDrink: Drink;

  switch (product.title) {
    case "Pear Chicken Salad":
      recommendedDrink = drinkArray[0];
      break;
    case "Caesar Shrimp Salad":
      recommendedDrink = drinkArray[1];
      break;
    case "Fall Quinoa Salad":
      recommendedDrink = drinkArray[2];
      break;
    case "Grilled Salmon Salad":
      recommendedDrink = drinkArray[3];
      break;
    case "Taco Salad":
      recommendedDrink = drinkArray[4];
      break;
    case "Thai Chicken Salad":
      recommendedDrink = drinkArray[0];
      break;
    default:
      recommendedDrink = drinkArray[0];
      break;
  }

  return recommendedDrink;
}
