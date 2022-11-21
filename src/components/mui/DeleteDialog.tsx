import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import React, { useMemo, useState } from "react";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
// import useAxios from 'axios-hooks';
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";

const DeleteDialog = ({
  text,
  refetch,
  id,
  mutation,
}: {
  text: {
    title: string;
    body?: string;
    validation?: string;
    onComplete?: string;
    onError?: string;
    textFieldLabel: string;
  };
  id: string | number;
  refetch: () => void;
  mutation: DocumentNode;
}) => {
  const { onComplete = "Verwijderd", onError = "Er ging iets fout!", validation, textFieldLabel, title, body } = text;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(() => {
    return validation ?  touched && value === validation : true;
  }, [validation, value]);

  const isError = useMemo(() => {
    return validation ?  touched && value !== validation : false;
  }, [validation, value, touched]);

  const [deleteMutation, { loading }] = useMutation(mutation, {
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setValue("");
      setTouched(false);
      setOpen(false);
      refetch();
      enqueueSnackbar(onComplete, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(onError, { variant: "error" });
    },
  });

  return (
    <>
      <Tooltip title="Verwijderen">
        <IconButton
          style={{
            color: theme.palette.error.main,
          }}
          onClick={() => setOpen(true)}
          size="large">
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="title">{title}</DialogTitle>
        <DialogContent style={{ height: "100%" }}>
          <DialogContentText style={{ display: "flex", flexDirection: "column" }}>
            <Typography style={{ color: theme.palette.warning.darker }}>
              Deze actie kan niet ongedaan gemaakt worden.
            </Typography>
            <Typography>{body}</Typography>
            {validation && (
              <TextField
                variant="outlined"
                margin="dense"
                id="company"
                type="text"
                autoComplete={"no"}
                name="number"
                style={{ marginTop: 15 }}
                label={textFieldLabel}
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={(event) => setTouched(true)}
                error={isError}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Annuleer
          </Button>
          <Button
            style={{
              backgroundColor: isValid ? theme.palette.error.main : "",
              color: "white",
            }}
            disabled={!isValid}
            variant="contained"
            onClick={() => deleteMutation()}>
            Verwijder
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
