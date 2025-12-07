import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    acceptFriendRequest,
    cancelFriendRequest,
    declineFriendRequest,
    getFriends,
    getIncomingFriendRequests,
    getOutgoingFriendRequests,
    sendFriendRequest
} from "@/service/friendService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

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
            queryClient.invalidateQueries({queryKey: ["outgoing friend requests"]})
        }
    })

    return {isPending, isError, sendFriendRequest: mutateAsync, reset}
}

export function useGetIncomingFriendRequests() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: ["incoming friend requests"],
        queryFn: () => getIncomingFriendRequests(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}

export function useGetOutgoingFriendRequests() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: ["outgoing friend requests"],
        queryFn: () => getOutgoingFriendRequests(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}

export function useAcceptFriendRequest() {
    const queryClient = useQueryClient();
    const {isPending, isError, isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (gamerTag: string) => {
            return acceptFriendRequest(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["friends"]})
            queryClient.invalidateQueries({queryKey: ["incoming friend requests"]})
        }
    })

    return {isPending, isError, isSuccess, error, acceptFriendRequest: mutateAsync}
}

export function useDeclineFriendRequest() {
    const queryClient = useQueryClient();
    const {isPending, isError, isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (gamerTag: string) => {
            return declineFriendRequest(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["incoming friend requests"]})
        }
    })

    return {isPending, isError, isSuccess, error, declineFriendRequest: mutateAsync}
}

export function useCancelFriendRequest() {
    const queryClient = useQueryClient();
    const {isPending, isError, isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (gamerTag: string) => {
            return cancelFriendRequest(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["outgoing friend requests"]})
        }
    })

    return {isPending, isError, isSuccess, error, cancelFriendRequest: mutateAsync}
}