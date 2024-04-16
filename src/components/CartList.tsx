import { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

export default function CartList() {
  const { removeItemFromCart, cartItems } = useCart();
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // calculate total cost of all the cart items
    const totalCost = cartItems.reduce((result, item) => {
      return item.product.price * item.quantity + result;
    }, 0);

    setCartTotal(totalCost);
  }, [cartItems]);

  const renderPriceSpan = (price: number) => {
    return price > 0 ? <span className="price-span">{price} kr</span> : null;
  };

  return (
    <>
      <div className="cart-listq">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Cart
        </Typography>
        <List dense>
          {cartItems.map((item) => {
            const product = item.product;
            return (
              <ListItem
                key={product.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      removeItemFromCart(product);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={product.imageUrl} variant="rounded" />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={renderPriceSpan(product.price)}
                />
              </ListItem>
            );
          })}
        </List>
        <br />
        {cartTotal > 0 ? (
          <Typography variant="h6" sx={{ ml: 2 }}>
            Total: {cartTotal} kr.
          </Typography>
        ) : null}
      </div>
    </>
  );
}
