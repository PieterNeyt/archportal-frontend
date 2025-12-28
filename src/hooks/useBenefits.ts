import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {buyBenefit, getAllBenefits, getBenefitsByIds, getPoints} from "@/service/benefitService";

const BENEFITS_KEY = "benefits";
const POINTS_KEY = "profile-points";
const PROFILE_KEY = "profile"

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
        queryKey: ["inventory", benefitIds],
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