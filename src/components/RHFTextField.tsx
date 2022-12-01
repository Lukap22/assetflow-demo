
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type IProps<T> = {
  name: keyof T;
};

type Props<T> = IProps<T> & TextFieldProps;

export default function RHFTextField<T>({ name, ...other }: Props<T>) {
  const { control, } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
