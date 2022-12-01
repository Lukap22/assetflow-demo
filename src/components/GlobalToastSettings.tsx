import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";


export default function GlobalToastSettings() {
    const { toasts } = useToasterStore();

    const TOAST_LIMIT = 3

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                // Default options for specific types
                success: {
                    duration: 3000,
                    theme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                },
            }}
        />)

}