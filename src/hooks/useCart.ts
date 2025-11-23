import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToCart, getCart, removeFromCart} from "@/service/gameService.ts";

export function useCart() {
    const queryClient = useQueryClient();

    const {data: cart, isLoading: isCartLoading} = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart()
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

    return {
        cart,
        isCartLoading,
        addToCart: addToCartMutation.mutate,
        removeFromCart: removeFromCartMutation.mutate,
        isAddingToCart: addToCartMutation.isPending,
        isRemovingFromCart: removeFromCartMutation.isPending
    };
}