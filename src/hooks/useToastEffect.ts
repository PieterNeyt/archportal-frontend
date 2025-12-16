import {useEffect} from "react";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";
import {GREEN_BLURRY_BACKGROUND, RED_BLURRY_BACKGROUND} from "@/styles/customClasses.ts";

export default function useToastEffect(action: {
    isSuccess: boolean;
    isError: boolean;
    error: unknown
}, successTitle: string, errorTitle: string, successDescription?: string) {
    useEffect(() => {

        if (action.isSuccess) {
            addToast({
                title: successTitle,
                description: successDescription ?? 'Action succeeded.',
                classNames: {
                    base: GREEN_BLURRY_BACKGROUND,
                }
            });
        }
    }, [action.isSuccess, successDescription, successTitle]);

    useErrorToastEffect(action, errorTitle, "An unexpected error occurred")
}

export function useErrorToastEffect(action: {
    isError: boolean;
    error: unknown
}, errorTitle: string, errorDescription: string) {

    useEffect(() => {
        if (action.error && action.isError) {
            let errorMessage = errorDescription;
            if (action.error instanceof AxiosError && action.error.response?.data?.message) {
                errorMessage = action.error.response.data.message;
            }
            addToast({
                title: errorTitle,
                description: errorMessage,
                color: "danger",
                classNames: {
                    base: RED_BLURRY_BACKGROUND,
                }
            })
        }
    }, [action.error, action.isError, errorDescription, errorTitle]);
}