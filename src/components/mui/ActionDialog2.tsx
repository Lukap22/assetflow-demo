import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";

type ActionDialogProps = {
  title?: string;
  children: ReactNode;
  actions: ReactNode;
} & React.ComponentProps<typeof Dialog>;

const ActionDialog2 = ({ title, children, actions, ...props }: ActionDialogProps) => {
  return (
    <Dialog {...props}>
      {!!!title && <DialogTitle id="title">{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog2;
