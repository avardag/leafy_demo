import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { green } from "@mui/material/colors";

interface CustomButtonProps extends ButtonProps {
  dark: boolean;
}

export const StyledButton = styled(Button)<CustomButtonProps>(
  {
    // ...
  },
  ({ dark, theme }: CustomButtonProps) => {
    const clr = dark ? green[800] : green["A700"];
    return {
      color: theme.palette.getContrastText(clr),
      backgroundColor: clr,
      "&:hover": {
        backgroundColor: green[900],
      },
    };
  },
);
