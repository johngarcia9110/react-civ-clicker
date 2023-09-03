import { ThemeProvider } from "@mui/material";
import theme from "./styles";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation";
import SnackbarProvider from "./providers/SnackbarProvider";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
