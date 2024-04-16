export const SalladCategoryEnum = {
  All: "All",
  Vegetarisk: "Vegetarisk",
  Kyckling: "Kyckling",
  FiskSkaldjur: "Fisk/Skaldjur",
} as const;

export const DressingCategoryEnum = {
  All: "All",
  Mild: "Mild",
  Stark: "Stark",
  Oljebaserad: "Oljebaserad",
  MayonnaiseBased: "Mayonnaise-based",
} as const;

export const DrinkCategoryEnum = {
  All: "All",
  "Ordinary Drink": "Ordinary Drink",
  Cocktail: "Cocktail",
  Cocoa: "Cocoa",
  "Punch / Party Drink": "Punch / Party Drink",
  "Soft Drink": "Soft Drink",
} as const;

interface PriceDictionary {
  [category: string]: number;
}

export const categoryPrices: PriceDictionary = {
  "Ordinary Drink": 17,
  Cocktail: 25,
  Cocoa: 20,
  "Punch / Party Drink": 18,
  "Soft Drink": 15,
};
