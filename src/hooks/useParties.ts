import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    acceptPartyInvite,
    createParty,
    declinePartyInvite,
    getEligibleGames,
    getFriendsForInvite,
    getInvitedParties,
    getMembersOfParty,
    getParty,
    getSelectedGame,
    kickFromParty,
    leaveParty,
    selectPartyGame,
    sendPartyInvite
} from "@/service/partyService.ts";
import {CreateParty} from "@/model/party.ts";

const PARTY_KEY = "party"
const PARTY_MEMBERS_KEY = "party members"
const FRIENDS_TO_INVITE = "friends to invite"
const PARTY_INVITES_KEY = "party invites"
const ELEGIBLE_GAMES_KEY = "eligible-games"
const SELECTED_GAME_KEY = "selected-game"

export function useParty() {
    const {isLoading, isError, data: party, refetch} = useQuery({
        queryKey: [PARTY_KEY],
        queryFn: () => getParty()
    });

    return {isLoading, isError, party, refetch};
}

export function useCreateParty() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError} = useMutation({
        mutationFn: (party: CreateParty) => {
            return createParty(party)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
        }
    });
    return {isPending, isError, createParty: mutateAsync};
}

export function useGetPartyMembers() {
    const {isLoading, isError, data: members, refetch} = useQuery({
        queryKey: [PARTY_MEMBERS_KEY],
        queryFn: () => getMembersOfParty(),
        refetchInterval: 1000
    })

    return {isLoading, isError, members, refetch}
}

export function useSendPartyInvite() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: (gamerTag: string) => {
            return sendPartyInvite(gamerTag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
            queryClient.invalidateQueries({queryKey: [FRIENDS_TO_INVITE]})
        }
    });
    return {isPending, isError, error, isSuccess, sendPartyInvite: mutateAsync};
}

export function useGetFriendsToInvite() {
    const {isLoading, isError, data: friends, refetch} = useQuery({
        queryKey: [FRIENDS_TO_INVITE],
        queryFn: () => getFriendsForInvite(),
        refetchInterval: 1000
    })

    return {isLoading, isError, friends, refetch}
}

export function useGetInvitedParties() {
    const {isLoading, isError, data: parties, refetch} = useQuery({
        queryKey: [PARTY_INVITES_KEY],
        queryFn: () => getInvitedParties(),
        refetchInterval: 1000
    })

    return {isLoading, isError, parties, refetch}
}

export function useAcceptPartyInvite() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: (partyId: string) => {
            return acceptPartyInvite(partyId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_INVITES_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
        }
    });

    return {isPending, isError, error, isSuccess, acceptInvite: mutateAsync};
}

export function useDeclinePartyInvite() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: (partyId: string) => {
            return declinePartyInvite(partyId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_INVITES_KEY]})
        }
    });

    return {isPending, isError, error, isSuccess, declineInvite: mutateAsync};
}

export function useLeaveParty() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: () => {
            return leaveParty();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_KEY]})
            queryClient.invalidateQueries({queryKey: [PARTY_INVITES_KEY]})
        }
    })

    return {isPending, isError, error, isSuccess, leaveParty: mutateAsync};
}

export function useKickFromParty() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, error, isSuccess, isError} = useMutation({
        mutationFn: (gamertag: string) => {
            return kickFromParty(gamertag);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_MEMBERS_KEY]})
        }
    })

    return {isPending, isError, error, isSuccess, kickFromParty: mutateAsync};
}

export function useGetEligibleGames() {
    const { members } = useGetPartyMembers();
    const partySize = members?.length || 0;

    return useQuery({
        queryKey: [ELEGIBLE_GAMES_KEY, partySize],
        queryFn: () => getEligibleGames(),
        refetchInterval: 5000,
    });
}

export function useSelectedGame() {
    return useQuery({
        queryKey: [SELECTED_GAME_KEY],
        queryFn: () => getSelectedGame(),
        refetchInterval: 1000
    });
}

export function useSelectGame() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (gameId: string) => {
            return selectPartyGame(gameId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SELECTED_GAME_KEY] });
        }
    });
}