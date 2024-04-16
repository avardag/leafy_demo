import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { DrawerHeader, Main, StyledAppBar, drawerWidth } from "./Layout.styles";
import logo from "../assets/Logo.png";
import CartList from "./CartList";
import useCart from "../hooks/useCart";

interface Props {
  children: React.ReactElement;
}
function ElevationScroll(props: Props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    // target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function PersistentDrawerRight({ children }: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { cartItems } = useCart();

  React.useEffect(() => {
    if (cartItems.length === 1) handleDrawerOpen();
  }, [cartItems]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ElevationScroll>
        <StyledAppBar position="fixed" open={open} sx={{ background: "white" }}>
          <Toolbar>
            <Link to="/">
              <Box
                component="img"
                sx={{ height: 54, mr: 2 }}
                alt="Logo"
                src={logo}
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                color: "green",
              }}
              component="div"
            >
              Leafy Delights
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              <Link to="sallad" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  sx={{
                    fontWeight: "bold",
                    mx: 2,
                    color: "green",
                  }}
                >
                  Sallader
                </Button>
              </Link>
              <Link to="drink" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  sx={{
                    fontWeight: "bold",
                    mx: 2,
                    color: "green",
                  }}
                >
                  Drycker{" "}
                </Button>
              </Link>
            </Box>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <ShoppingBasketIcon
                fontSize="large"
                sx={{ color: green["A700"] }}
              />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <CartList />
      </Drawer>
    </Box>
  );
}
