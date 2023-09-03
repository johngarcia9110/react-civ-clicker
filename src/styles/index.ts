import { createTheme } from "@mui/material";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const palette = {
  primary: {
    main: colors.black,
  },
  secondary: {
    main: colors.secondary,
  },
  text: {
    primary: colors.black,
  },
};

const typography = {
  fontFamily: fontFamily.Inter,
  fontWeightBold: 900,
  allVariants: {
    color: colors.black,
  },
};

const _theme = createTheme({
  palette,
  typography,
  // components: components,
});

export default _theme;
