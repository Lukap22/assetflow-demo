import {zodResolver} from '@hookform/resolvers/zod';
import FormProvider from "components/FormProvider";
import RHFTextField from "components/RHFTextField";
import {useForm} from 'react-hook-form';
import toast from "react-hot-toast";
import {z} from "zod";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

const schema = z.object({
    email: z.string().min(1, {message: 'Required'}),
    password: z.string().min(10),
});

type Schema = z.infer<typeof schema>;

//https://rsinohara.github.io/json-to-zod-react/
export default function Login() {
    const {push} = useRouter()
    const methods = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const {handleSubmit, reset, formState: {isSubmitting, isValid, isDirty}} = methods;

    const onSubmit = (data: Schema) => {
        push("/")
        toast.success(`User ${data.email} login`, {});
        reset();
    }

    return <div className="flex h-screen flex-col">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, () => toast.error(`Invalid input`, {}))}>
            <h1 className="text-3xl font-bold underline">
                Login pages
            </h1>
            <div className=" flex flex-1 justify-center items-center">
                <div className="flex flex-row gap-5 flex-wrap">
                    <RHFTextField<Schema> name="email" placeholder="email"/>
                    <RHFTextField<Schema> name="password" placeholder="password"/>
                    <Button variant={"contained"} fullWidth type="submit"> Login</Button>
                </div>
            </div>
        </FormProvider>
    </div>
}

