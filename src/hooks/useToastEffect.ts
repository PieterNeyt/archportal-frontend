import {useEffect} from "react";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";

export default function useToastEffect(action: {
    isSuccess: boolean;
    isError: boolean;
    error: unknown
}, successTitle: string, errorTitle: string, successDescription?: string) {
    useEffect(() => {
        if (action.isSuccess) {
            addToast({
                title: successTitle,
                description: successDescription ?? errorTitle,
                color: "success"
            });
        } else if (action.isError) {
            let errorMessage = "An unexpected error occurred";
            const err = action.error;
            if (err instanceof AxiosError && err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            addToast({
                title: errorTitle,
                description: errorMessage,
                color: "danger"
            });
        }
    }, [action.isSuccess, action.isError, action.error, successTitle, errorTitle, successDescription]);
}
