import { IProductCard } from "../shared/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProductCard = ({
  product: { imageUrl, title, price },
  handleClick,
}: IProductCard) => {
  const showPrice = () => {
    if (!!price && price > 0) return true;
  };

  return (
    <Card sx={{ width: 280 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia sx={{ height: 240 }} image={imageUrl} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          {showPrice() && (
            <Typography variant="h6" color="text.secondary">
              {price} kr.
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
