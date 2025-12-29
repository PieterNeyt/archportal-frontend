import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProfile, syncProfile, toggleBenefit} from "@/service/profileService.ts";

export const PROFILE_KEY = "profile"
const PROFILE_SYNC_KEY = "syncProfile"
const USERNAME_COLOUR_KEY = "active-username-color"

export function useSyncProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_SYNC_KEY],
        queryFn: () => syncProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: () => getProfile(),
    })
    return {isLoading, isError, refetch, profile}
}

export function useToggleBenefit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({benefitId}: { benefitId: string }) => {
            return toggleBenefit(benefitId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PROFILE_KEY]});
            queryClient.invalidateQueries({queryKey: [USERNAME_COLOUR_KEY]});
        }
    });
}