import {useMutation} from "@tanstack/react-query";
import {checkout} from "@/service/gameService.ts";


export function useCheckout() {
    const checkoutMutation = useMutation({

        mutationFn: (benefitId?: string) => checkout(benefitId),
        onSuccess: (data) => {
            window.location.href = data.paymentUrl;
        }
    });

    return {
        checkout: checkoutMutation.mutate,
        isCheckingOut: checkoutMutation.isPending,
        checkoutError: checkoutMutation.error
    };
}