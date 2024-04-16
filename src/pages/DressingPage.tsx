import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { IProduct, IRecipe } from "../shared/types";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { DressingCategoryEnum } from "../shared/enums";
import { Button, Container, Stack } from "@mui/material";
import { recipeToProductDto } from "../dtos/productDtos";

const DressingPage = () => {
  const navigate = useNavigate();

  const { addItemToCart } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  const { data: dressings, isLoading } = useFetch<IRecipe[]>(
    "https://iths-2024-recept-grupp8-y55g9z.reky.se/categories/Dressing/recipes",
  );

  const [filteredDressings, setFilteredDressings] = useState<IRecipe[] | null>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    DressingCategoryEnum.All,
  );

  useEffect(() => {
    setFilteredDressings(dressings);
  }, [dressings]);

  const filterDressings = (category: string) => {
    if (category === DressingCategoryEnum.All) {
      setFilteredDressings(dressings);
    } else {
      const filtered = dressings?.filter((dressing) =>
        dressing.categories.includes(category),
      ) as IRecipe[];
      setFilteredDressings(filtered);
    }
  };

  const onFilterButtonClick = (category: string) => {
    filterDressings(category);
    setSelectedCategory(category);
  };
  const handleNextClick = (product: IProduct) => {
    addItemToCart(product);
    enqueueSnackbar(`${product.title} added to cart`, { variant: "success" });
    navigate("/drink");
  };

  if (isLoading) return <p>Laddar...</p>;
  if (dressings && dressings?.length < 1) return <p>Hittade inga dressingar</p>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <h1>Dressings</h1>
        <Stack direction="row" spacing={2} sx={{ m: 3 }}>
          {Object.values(DressingCategoryEnum).map((category, index) => (
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
          {filteredDressings &&
            filteredDressings.map((dressing) => {
              const product = recipeToProductDto(dressing);
              return (
                <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard
                    product={product}
                    handleClick={() => handleNextClick(product)}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

export default DressingPage;
