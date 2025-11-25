import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToCart, getCart, removeFromCart} from "@/service/gameService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

export function useCart() {
    const queryClient = useQueryClient();
    const {isAuthenticated} = useContext(SecurityContext)

    const {data: cart, isLoading: isCartLoading} = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart(),
        enabled: isAuthenticated()
    });

    const addToCartMutation = useMutation({
        mutationFn: (gameId: string) => addToCart(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    });

    const removeFromCartMutation = useMutation({
        mutationFn: (gameId: string) => removeFromCart(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["cart"]});
        }
    });
    const itemCount = cart?.items?.length ?? 0;
    return {
        cart,
        isCartLoading,
        addToCart: addToCartMutation.mutate,
        removeFromCart: removeFromCartMutation.mutate,
        isAddingToCart: addToCartMutation.isPending,
        isRemovingFromCart: removeFromCartMutation.isPending,
        itemCount
    };
}