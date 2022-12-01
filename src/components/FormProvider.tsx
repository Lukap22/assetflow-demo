import { ReactNode } from 'react';
import { FormProvider as Form, useForm, UseFormReturn, FieldValues } from 'react-hook-form';

type Props<T> = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function FormProvider<T>({ children, onSubmit, methods }: Props<T>) {
  return (
    <Form {...methods} >
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}


