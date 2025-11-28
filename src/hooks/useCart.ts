import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addToCart, getCart, removeFromCart} from "@/service/gameService.ts";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";

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
            addToast({
                title: "Game Added to cart",
                color:"success",
            })
        },
        onError: (error) => {
            let errorMessage = "Failed to add to cart";

            if (error instanceof AxiosError && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            addToast({
                title: errorMessage,
                color: "danger"
            });
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