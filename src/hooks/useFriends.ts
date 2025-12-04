import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {acceptFriendRequest, getFriendRequests, getFriends, sendFriendRequest} from "@/service/friendService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {AxiosError} from "axios";
import {addToast} from "@heroui/toast";

export function useFriends() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: ["friends"],
        queryFn: () => getFriends(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}

export function useSendFriendRequest() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError, reset} = useMutation({
        mutationFn: (gamertag: string) => {
            return sendFriendRequest(gamertag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["friends"]})
            addToast({
                title: "Friend request send",
                description: "Your friend request has been sent.",
                color: "success"
            })
        },
        onError: (error) => {
            let errorMessage = "Failed to send friend request";

            if (error instanceof AxiosError && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            addToast({
                title: "Failed to send friend request",
                description: errorMessage,
                color: "danger",

            })
        }
    })

    return {isPending, isError, sendFriendRequest: mutateAsync, reset}
}

export function useGetFriendRequests() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: ["friend requests"],
        queryFn: () => getFriendRequests(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}

export function useAcceptFriendRequest() {
    const queryClient = useQueryClient();
    const {isPending, isError, mutateAsync} = useMutation({
        mutationFn: (gamerTag: string) => {
            return acceptFriendRequest(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["friends"]})
            queryClient.invalidateQueries({queryKey: ["friend requests"]})
            addToast({
                title: "Friend request accepted",
                description: "You accepted the friend request.",
                color: "success"
            })
        },
        onError: (error) => {
            let errorMessage = "Failed to accept friend request";

            if (error instanceof AxiosError && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            addToast({
                title: "Failed to accept friend request",
                description: errorMessage,
                color: "danger"
            })
        }
    })

    return {isPending, isError, acceptFriendRequest: mutateAsync}
}