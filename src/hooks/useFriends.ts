import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    acceptFriendRequest,
    cancelFriendRequest,
    declineFriendRequest,
    getFriends, getFriendsFromProfileId,
    getIncomingFriendRequests, getIsFriendsFromProfileId,
    getOutgoingFriendRequests,
    removeFriend,
    sendFriendRequest
} from "@/service/friendService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

const FRIENDS_KEY = "friends";
const OUTGOING_REQUEST_KEY = "outgoing friend requests";
const INCOMING_REQUEST_KEY = "incoming friend requests";

export function useFriends() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles, refetch} = useQuery({
        queryKey: [FRIENDS_KEY],
        queryFn: () => getFriends(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles, refetch};
}

export function useProfileFriends(profileId:string) {
    const {isLoading, isError, data: friends, refetch} = useQuery({
        queryKey: [FRIENDS_KEY,profileId],
        queryFn: () => getFriendsFromProfileId(profileId),
    });
    return {isLoading, isError, friends, refetch};
}

export function useIsProfileFriend(profileId:string) {
    const {isLoading, isError, data: friends, refetch} = useQuery({
        queryKey: [FRIENDS_KEY,`isfriends-${profileId}`],
        queryFn: () => getIsFriendsFromProfileId(profileId),
        enabled:!!profileId
    });
    return {isLoading, isError, friends, refetch};
}

export function useSendFriendRequest() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError, reset} = useMutation({
        mutationFn: (gamertag: string) => {
            return sendFriendRequest(gamertag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [OUTGOING_REQUEST_KEY]})
        }
    })

    return {isPending, isError, sendFriendRequest: mutateAsync, reset}
}

export function useGetIncomingFriendRequests() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: [INCOMING_REQUEST_KEY],
        queryFn: () => getIncomingFriendRequests(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}

export function useGetOutgoingFriendRequests() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: [OUTGOING_REQUEST_KEY],
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
            queryClient.invalidateQueries({queryKey: [FRIENDS_KEY]})
            queryClient.invalidateQueries({queryKey: [INCOMING_REQUEST_KEY]})
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
            queryClient.invalidateQueries({queryKey: [INCOMING_REQUEST_KEY]})
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
            queryClient.invalidateQueries({queryKey: [OUTGOING_REQUEST_KEY]})
        }
    })

    return {isPending, isError, isSuccess, error, cancelFriendRequest: mutateAsync}
}

export function useRemoveFriend() {
    const queryClient = useQueryClient();
    const {isPending, isError, isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (gamerTag: string) => {
            return removeFriend(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [FRIENDS_KEY]})
        }
    })

    return {isPending, isError, isSuccess, error, removeFriend: mutateAsync}
}