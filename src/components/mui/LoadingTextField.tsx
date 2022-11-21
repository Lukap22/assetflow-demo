import { Skeleton, SxProps, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { Theme } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import omit from "lodash/omit";

type LoadingTextFieldProps = TextFieldProps & {
  loading: boolean;
  skeletonSX?: SxProps<Theme> | undefined;
  width?: string | number | undefined;
  delayedLoadingTime?: number;
};

/**
 * @description Displays a skeleton with the dimensions of the TextField when loading is true.
 * @author Luka Pelgröm
 * @Copyright ProfitFlow B.V.
 * @Date 2020-08-26
 */
export default function LoadingTextField(props: LoadingTextFieldProps) {
  const { loading, skeletonSX, width = "100%", style, delayedLoadingTime = 0 } = props;
  const [delayedLoading, setDelayedLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(loading);
    }, delayedLoadingTime);
    return () => clearTimeout(timer);
  }, [loading]);

  return delayedLoading ? (
    <Skeleton width={width} style={style} sx={{ ...skeletonSX, ...{ borderRadius: 1 } }} variant="rectangular">
      <TextField {...omit(props, "skeletonSX", "loading", "width", "delayedLoadingTime")} />
    </Skeleton>
  ) : (
    <TextField {...omit(props, "skeletonSX", "loading", "width", "delayedLoadingTime")} />
  );
}
