import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProfile, toggleBenefit} from "@/service/profileService.ts";

const PROFILE_KEY = "profile"

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: () => getProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}

export function useToggleBenefit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ benefitId }: { benefitId: string}) =>
            toggleBenefit(benefitId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
        }
    });
}