import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {buyBenefit, getBenefits, getPoints } from "@/service/benefitService";

const BENEFITS_KEY = "benefits";
const POINTS_KEY = "profile-points";
const PROFILE_KEY = "profile"

export function useBenefits() {
    return useQuery({
        queryKey: [BENEFITS_KEY],
        queryFn: getBenefits
    });
}

export function useBuyBenefit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => buyBenefit(id),
        onSuccess: (newPoints) => {

            queryClient.setQueryData([POINTS_KEY], newPoints);

            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
            queryClient.invalidateQueries({ queryKey: [POINTS_KEY], refetchType: 'none' });
        }
    });
}

export function usePoints() {
    return useQuery({
        queryKey: [POINTS_KEY],
        queryFn: getPoints
    });
}