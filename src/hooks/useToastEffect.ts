import {useEffect} from "react";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";
import {
    GROEN_BLURRY_BACKGROUND,
    ROOD_BLURRY_BACKGROUND
} from "@/styles/customClasses.ts";

export default function useToastEffect(action: {
    isSuccess: boolean;
    isError: boolean;
    error: unknown
}, successTitle: string, errorTitle: string, successDescription?: string) {
    useEffect(() => {

        if (action.isSuccess) {
            addToast({
                title: successTitle,
                description: successDescription ?? 'Actie is succesvol uitgevoerd.',
                classNames: {
                    base: GROEN_BLURRY_BACKGROUND,
                }
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
                classNames: {
                  base: ROOD_BLURRY_BACKGROUND,
                }
            });
        }
    }, [action.isSuccess, action.isError, action.error, successTitle, errorTitle, successDescription]);
}