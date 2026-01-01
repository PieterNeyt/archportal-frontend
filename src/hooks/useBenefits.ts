import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import {
    buyBenefit,
    getActiveUsernameColor,
    getActiveUsernameColorFromProfileID,
    getAllBenefits,
    getPoints,
    getProfileBenefits,
    getProfileDiscounts
} from "@/service/benefitService";
import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";

const BENEFITS_KEY = "benefits";
const POINTS_KEY = "profile-points";
const PROFILE_DISCOUNTS_KEY = "profile-discounts"
const USERNAME_COLOUR_KEY = "active-username-color"
const PROFILE_BENEFITS_KEY = "profile benefits";

export function useBenefits() {
    return useQuery({
        queryKey: [BENEFITS_KEY],
        queryFn: getAllBenefits
    });
}

export function useBuyBenefit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => buyBenefit(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [POINTS_KEY]});
            queryClient.invalidateQueries({queryKey: [PROFILE_BENEFITS_KEY]})
        }
    });
}

export function usePoints() {
    return useQuery({
        queryKey: [POINTS_KEY],
        queryFn: getPoints
    });
}

export function useProfileDiscounts() {
    const {isAuthenticated, isInitialised} = useContext(securityContext);
    return useQuery({
        queryKey: [PROFILE_DISCOUNTS_KEY],
        queryFn: getProfileDiscounts,
        enabled: isAuthenticated() && isInitialised,
    });
}

export function useActiveUsernameColor() {
    return useQuery({
        queryKey: [USERNAME_COLOUR_KEY],
        queryFn: getActiveUsernameColor
    });
}


export function useActiveUsernameColorFromProfileId(profileId:string) {
    const {isLoading, isError, refetch, data: profileColor} = useQuery({
        queryKey: [USERNAME_COLOUR_KEY],
        queryFn: () => getActiveUsernameColorFromProfileID(profileId),
        enabled: false
    })
    return {isLoading, isError, refetch, profileColor}
}


export function useProfileBenefits() {
    const {isAuthenticated, isInitialised} = useContext(securityContext);
    return useQuery({
        queryKey: [PROFILE_BENEFITS_KEY],
        queryFn: getProfileBenefits,
        enabled: isAuthenticated() && isInitialised,
    });
}