/* eslint-disable no-restricted-imports */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode, useState } from "react";

type ActionDialogProps = {
  title: string;
  children: ReactNode;
  openButton: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode;
  actionButton: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode;
  cancelButton?: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode;
  dialogProps?: React.ComponentProps<typeof Dialog>;
};

/**
 * ActionDialog is a component that can be used to forward aan action through a dialog.
 * @param title {string} The title of the dialog.
 * @param children {ReactNode} The content of the dialog.
 * @param openButton {ReactNode} The button that opens the dialog.
 * @param actionButton {ReactNode} The button that performs the action.
 * @param cancelButton {ReactNode} The button that cancels the action.
 * @param dialogProps {DialogProps} The props of the dialog.
 * @type {ActionDialogProps}
 *
 * @example
 * <caption>Basic usage</caption>
 *      <ActionDialog
 *         title={`Set ${name} verwijderen`}
 *         actionButton={ (setOpen) =>
 *           <Button
 *             color="primary"
 *             variant="contained"
 *             fullWidth
 *             onClick={() => {
 *               setOpen((prevOpen) => !prevOpen);
 *               deleteTemplateSetMutation();
 *             }}
 *             style={{ color: "white", flex: 1 }}
 *             startIcon={<PlaylistRemoveIcon />}>
 *             Verwijderen
 *           </Button>
 *         }
 *         openButton={ (setOpen) =>
 *           <Button
 *             color="primary"
 *             variant="contained"
 *             fullWidth
 *             onClick={() => {
 *               setOpen((prevOpen) => !prevOpen);
 *             }}
 *             style={{ color: "white", flex: 1 }}
 *             startIcon={<PlaylistRemoveIcon />}>
 *             Set verwijderen
 *           </Button>
 *         }>
 *         <Typography style={{ color: theme.palette.warning.darker }}>
 *           Deze actie kan niet ongedaan gemaakt worden.
 *         </Typography>
 *       </ActionDialog>
 */
const ActionDialog = ({ title, children, openButton, actionButton, cancelButton, dialogProps }: ActionDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {openButton(setOpen)}
      <Dialog {...dialogProps} open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {cancelButton ? (
            openButton(setOpen)
          ) : (
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Annuleer
            </Button>
          )}
          {actionButton(setOpen)}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionDialog;
