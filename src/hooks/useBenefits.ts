import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    buyBenefit,
    getActiveUsernameColor,
    getAllBenefits,
    getBenefitsByIds,
    getPoints,
    getProfileDiscounts
} from "@/service/benefitService";

const BENEFITS_KEY = "benefits";
const INVENTORY = "inventory";
const POINTS_KEY = "profile-points";
const PROFILE_KEY = "profile"
const PROFILE_DISCOUNTS_KEY = "profile-discounts"
const USERNAME_COLOUR_KEY = "active-username-color"

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
            queryClient.invalidateQueries({ queryKey: [POINTS_KEY] });
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
        }

    });
}
export function useInventory(benefitIds: string[] | undefined) {
    return useQuery({
        queryKey: [INVENTORY, benefitIds],
        queryFn: () => getBenefitsByIds(benefitIds || []),
        enabled: !!benefitIds && benefitIds.length > 0,
    });
}
export function usePoints() {
    return useQuery({
        queryKey: [POINTS_KEY],
        queryFn: getPoints
    });
}
export function useProfileDiscounts() {
    return useQuery({
        queryKey: [PROFILE_DISCOUNTS_KEY],
        queryFn: getProfileDiscounts
    });
}
export function useActiveUsernameColor() {
    return useQuery({
        queryKey: [USERNAME_COLOUR_KEY],
        queryFn: getActiveUsernameColor
    });
}