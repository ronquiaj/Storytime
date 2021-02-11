import { useState, createContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export const AlertContext = createContext();

export function AlertProvider(props) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [color, setAlertColor] = useState("error");

  const closeSnackbar = () => {
    setOpen(false);
  };

  const openSnackbar = () => {
    setOpen(true);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const SnackbarAlert = () => {
    return (
      <Snackbar open={open} autoHideDuration={3500} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={color}>
          {alert}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <AlertContext.Provider value={{ openSnackbar, setAlert, SnackbarAlert, setAlertColor }}>
      {props.children}
    </AlertContext.Provider>
  );
}
