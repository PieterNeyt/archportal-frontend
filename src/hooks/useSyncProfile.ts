import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toggleBenefit} from "@/service/profileService.ts";

export const PROFILE_KEY = "profile"
const USERNAME_COLOUR_KEY = "active-username-color"

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