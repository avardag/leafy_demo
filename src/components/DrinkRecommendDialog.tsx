import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { Drink, IProduct } from "../shared/types";
import { drinkToProductDtoWithPrice } from "../dtos/productDtos";
import ProductCard from "./ProductCard";

interface DrinkRecommendDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drink: Drink;
  handleConfirm: (product: IProduct) => void;
}
export default function DrinkRecommendDialog({
  isDialogOpen,
  setIsDialogOpen,
  drink,
  handleConfirm,
}: DrinkRecommendDialogProps) {
  const product = drinkToProductDtoWithPrice(drink);
  const handleConfirmClose = () => {
    handleConfirm(product);
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle id="alert-dialog-title">{drink.strDrink}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <DialogContentText id="alert-dialog-description" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          cumque tenetur sunt ducimus vel harum officia? Quidem voluptatibus
          laboriosam, sunt animi mollitia aliquid eaque eum exercitationem qui
          quam quaerat nesciunt.
        </DialogContentText>
        <ProductCard
          product={product}
          handleClick={() => handleConfirm(product)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setIsDialogOpen(false)}
        >
          Choose another
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={handleConfirmClose}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
