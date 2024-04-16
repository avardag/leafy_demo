export interface Drink {
  idDrink: string;
  strDrink: string;
  strTags: string;
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
}

export interface IProductCard {
  product: IProduct;
  handleClick: () => void;
}

export interface IIngredient {
  name: string;
  amount: number;
  unit: string;
  _id: string;
}

export interface IRecipe {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  timeInMins: number;
  categories: string[];
  instructions: string[];
  ingredients: IIngredient[];
  avgRating: number | null;
}

export interface IRecipeApiResponseList {
  recipes: IRecipe[];
}
export interface IRecipeApiResponseSingle {
  recipe: IRecipe;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
