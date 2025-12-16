import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToCart, getCart, removeFromCart} from "@/service/gameService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

const CART_KEY = "cart";

export function useCart() {
    const queryClient = useQueryClient();
    const {isAuthenticated} = useContext(SecurityContext)

    const {data: cart, isLoading: isCartLoading} = useQuery({
        queryKey: [CART_KEY],
        queryFn: () => getCart(),
        enabled: isAuthenticated()
    });

    const addToCartMutation = useMutation({
        mutationFn: (gameId: string) => addToCart(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [CART_KEY]});
        }
    });

    const removeFromCartMutation = useMutation({
        mutationFn: (gameId: string) => removeFromCart(gameId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [CART_KEY]});
        }
    });
    const itemCount = cart?.items?.length ?? 0;
    return {
        cart,
        isCartLoading,
        addToCartMutation,
        addToCart: addToCartMutation.mutate,
        removeFromCart: removeFromCartMutation.mutate,
        isAddingToCart: addToCartMutation.isPending,
        isRemovingFromCart: removeFromCartMutation.isPending,
        itemCount
    };
}