import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createParty,
    getFriendsForInvite,
    getMembersOfParty,
    getParty,
    sendPartyInvite
} from "@/service/partyService.ts";

const PARTY_KEY = "party"
const PARTY_MEMBERS_KEY = "party members"
const PARTY_INVITES_KEY = "party invites"

export function useParty() {
    const {isLoading, isError, data: party} = useQuery({
        queryKey: [PARTY_KEY],
        queryFn: () => getParty()
    });

    return {isLoading, isError, party};
}

export function useCreateParty() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError} = useMutation({
        mutationFn: () => {
            return createParty()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
        }
    });
    return {isPending, isError, createParty: mutateAsync};
}

export function useGetPartyMembers() {
    const {isLoading, isError, data: members} = useQuery({
        queryKey: [PARTY_MEMBERS_KEY],
        queryFn: () => getMembersOfParty()
    })

    return {isLoading, isError, members}
}

export function useSendPartyInvite() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: (gamerTag: string) => {
            return sendPartyInvite(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_INVITES_KEY]})
        }
    });
    return {isPending, isError, error, isSuccess, sendPartyInvite: mutateAsync};
}

export function useGetFriendsToInvite() {
    const {isLoading, isError, data: friends, refetch} = useQuery({
        queryKey: [PARTY_INVITES_KEY],
        queryFn: () => getFriendsForInvite()
    })

    return {isLoading, isError, friends, refetch}
}