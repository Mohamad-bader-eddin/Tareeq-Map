import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Dispatch, SetStateAction, forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GenericAlert = ({
  open,
  setOpen,
  type,
  msg,
  vertical,
}: GenericAlertProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        horizontal: vertical ? "center" : "left",
        vertical: "bottom",
      }}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={type}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

type GenericAlertProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: "success" | "error" | "warning";
  msg: string;
  vertical?: boolean;
};

export default GenericAlert;
