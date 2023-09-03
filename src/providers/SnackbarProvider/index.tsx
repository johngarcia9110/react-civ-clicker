import { Alert, AlertProps, Snackbar } from "@mui/material";
import { createContext, useCallback, useEffect, useState } from "react";

export const SnackbarContext = createContext({
  showError: (message?: string) => {
    console.log("ShowError is not initialized");
  },
  showInfo: (message: string) => {
    console.log("ShowInfo is not initialized");
  },
  showSuccess: (message: string) => {
    console.log("showSuccess is not initialized");
  },
});

export interface IShowSnackbarArgs {
  message: string;
  severity: AlertProps["severity"];
}
export interface IQueuedSnackbar extends IShowSnackbarArgs {
  key: number;
}

const SnackbarProvider = ({ children }: any) => {
  const [queue, setQueue] = useState<readonly IQueuedSnackbar[]>([]);
  const [open, setOpen] = useState(false);
  const [currentSnackbar, setCurrentSnackbar] = useState<
    IQueuedSnackbar | undefined
  >(undefined);

  /**
   * This effect neatly closes the currently displayed snackbar if a new one is added
   * Ripped from mui docs: https://mui.com/material-ui/react-snackbar/#consecutive-snackbars
   */
  useEffect(() => {
    if (queue.length && !currentSnackbar) {
      /**
       * Set a new snackbar when we don't have an active one
       */
      setCurrentSnackbar({ ...queue[0] });
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    } else if (queue.length && currentSnackbar && open) {
      /**
       * Close an active snackbar when a new one is added
       */
      setOpen(false);
    }
  }, [queue, currentSnackbar, open]);

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    },
    []
  );

  const showSnackbar = useCallback(
    ({ message, severity }: IShowSnackbarArgs) => {
      const key = new Date().getTime();

      setQueue((prev) => [...prev, { message, severity, key }]);
    },
    []
  );

  const showSuccess = useCallback((message: string) => {
    showSnackbar({ severity: "success", message: message });
  }, []);

  const showInfo = useCallback((message: string) => {
    showSnackbar({ severity: "info", message: message });
  }, []);

  const showError = useCallback((message?: string) => {
    showSnackbar({
      severity: "error",
      message: message ?? "Something went wrong, please try again.",
    });
  }, []);

  return (
    <SnackbarContext.Provider value={{ showError, showInfo, showSuccess }}>
      <Snackbar onClose={handleClose} open={open}>
        <Alert
          onClose={handleClose}
          severity={currentSnackbar?.severity}
          elevation={6}
          variant="filled"
        >
          {currentSnackbar?.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
export default SnackbarProvider;
