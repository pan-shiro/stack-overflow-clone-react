import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

let theme = createTheme();

export default createTheme(theme, {
  components: {
    MuiAutocomplete: {
      defaultProps: {
        ChipProps: {
          size: "small",
        },
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "subtitle1",
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          "&:hover": {
            color: theme.palette.mode === "dark" ? blue[400] : blue[800],
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
