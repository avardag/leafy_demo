import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ProductCard from "../components/ProductCard";
import { IProduct, IRecipe } from "../shared/types";
import useCart from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import { SalladCategoryEnum } from "../shared/enums";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/material";
import { recipeToProductDto } from "../dtos/productDtos";
import { StyledButton } from "../components/StyledButton";

const SalladPage = () => {
  const navigate = useNavigate();

  const { addItemToCart, setSalladForDrinkRecommendation } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  const {
    data: sallads,
    isLoading,
    // error,
  } = useFetch<IRecipe[]>(
    "https://iths-2024-recept-grupp8-y55g9z.reky.se/categories/sallad/recipes",
  );

  const [filteredSallads, setFilteredSallads] = useState<IRecipe[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    SalladCategoryEnum.All,
  );

  useEffect(() => {
    setFilteredSallads(sallads);
  }, [sallads]);

  const filterSallads = (category: string) => {
    if (category === SalladCategoryEnum.All) {
      setFilteredSallads(sallads);
    } else {
      const filtered = sallads?.filter((sallad) =>
        sallad.categories.includes(category),
      ) as IRecipe[];
      setFilteredSallads(filtered);
    }
  };

  const onFilterButtonClick = (category: string) => {
    filterSallads(category);
    setSelectedCategory(category);
  };

  const handleNextClick = (product: IProduct) => {
    addItemToCart(product);
    enqueueSnackbar(`${product.title} added to cart`, { variant: "success" });
    setSalladForDrinkRecommendation(product);
    navigate("/dressing");
  };

  if (isLoading) return <p>Laddar...</p>;
  if (sallads && sallads?.length < 1) return <p>Hittade inga sallader</p>;

  return (
    <Container maxWidth="lg">
      <StyledButton variant="contained" bgColor="#fff">
        Next
      </StyledButton>
      <Box sx={{ flexGrow: 1 }}>
        <h1>Sallads</h1>
        <Stack direction="row" spacing={2} sx={{ m: 3 }}>
          {Object.values(SalladCategoryEnum).map((category, index) => (
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
          {filteredSallads &&
            filteredSallads.map((sallad) => {
              const product = recipeToProductDto(sallad);
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

export default SalladPage;
