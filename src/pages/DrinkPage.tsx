import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Drink, IProduct } from "../shared/types";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import useFetchDrinksByIds from "../hooks/useFetchDrinks";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DrinkCategoryEnum } from "../shared/enums";
import { Button, Container, Stack } from "@mui/material";
import { getRecommendedDrinkByProduct } from "../utils/getRecommendedDrinkByProduct";
import { drinkToProductDtoWithPrice } from "../dtos/productDtos";
import DrinkRecommendDialog from "../components/DrinkRecommendDialog";

const drinkIdList: string[] = ["11006", "11000", "12734", "13036", "17108"];

export const DrinkPage = () => {
  const { drinks, isLoading } = useFetchDrinksByIds(drinkIdList);

  const navigate = useNavigate();

  const { addItemToCart, salladForDrinkRecommendation } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  const [filteredDrinks, setFilteredDrinks] = useState<Drink[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    DrinkCategoryEnum.All,
  );

  useEffect(() => {
    setFilteredDrinks(drinks);
  }, [drinks]);

  //Recommend Drink Dialog stuff
  const [recommendedDrink, setRecommendedDrink] = useState<Drink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (drinks !== null && salladForDrinkRecommendation !== null) {
      setRecommendedDrink(
        getRecommendedDrinkByProduct(salladForDrinkRecommendation, drinks),
      );
      handleClickDialogOpen();
    }
  }, [drinks, salladForDrinkRecommendation]);

  const handleClickDialogOpen = () => {
    setIsDialogOpen(true);
  };

  /////////////////////

  const filterDrinks = (category: string) => {
    if (category === DrinkCategoryEnum.All) {
      setFilteredDrinks(drinks);
    } else {
      const filtered = drinks?.filter(
        (drink) => drink.strCategory === category,
      ) as Drink[];
      setFilteredDrinks(filtered);
    }
  };

  const onFilterButtonClick = (category: string) => {
    setSelectedCategory(category);
    filterDrinks(category);
  };

  const handleNextClick = (product: IProduct) => {
    addItemToCart(product);
    enqueueSnackbar(`${product.title} added to cart`, { variant: "success" });
    navigate("/confirmation");
  };

  if (isLoading) return <p>Laddar...</p>;

  return (
    <Container maxWidth="lg">
      {recommendedDrink && (
        <DrinkRecommendDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleConfirm={handleNextClick}
          drink={recommendedDrink}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <h1>Drinks</h1>
        <Stack direction="row" spacing={2} sx={{ m: 3 }}>
          {Object.values(DrinkCategoryEnum).map((category, index) => (
            <Button
              variant="contained"
              color={category === selectedCategory ? "success" : "warning"}
              key={index}
              onClick={() => onFilterButtonClick(category)}
            >
              {category}
            </Button>
          ))}
        </Stack>
        <Grid container spacing={4}>
          {drinks?.length === 0 || drinks === null ? (
            <p>Det finns inga drinkar för tillfället, återkom gärna senare</p>
          ) : (
            filteredDrinks &&
            filteredDrinks.map((drink) => {
              const product = drinkToProductDtoWithPrice(drink);
              return (
                <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                    product={product}
                    handleClick={() => handleNextClick(product)}
                  />
                </Grid>
              );
            })
          )}
        </Grid>{" "}
      </Box>
    </Container>
  );
};

export default DrinkPage;
