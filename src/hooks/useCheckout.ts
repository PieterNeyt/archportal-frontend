import {useMutation, useQueryClient} from "@tanstack/react-query";
import {checkout} from "@/service/gameService.ts";

export function useCheckout() {
    const queryClient = useQueryClient();

    const checkoutMutation = useMutation({
        mutationFn: () => checkout(),
        onSuccess: (data) => {
            // Invalidate cart na succesvolle checkout
            queryClient.invalidateQueries({queryKey: ["cart"]});
            // Redirect naar payment URL
            window.location.href = data.paymentUrl;
        }
    });

    return {
        checkout: checkoutMutation.mutate,
        isCheckingOut: checkoutMutation.isPending,
        checkoutError: checkoutMutation.error
    };
}