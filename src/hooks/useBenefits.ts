import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {buyBenefit, getBenefits, getPoints } from "@/service/benefitService";

const BENEFITS_KEY = "benefits";
const POINTS_KEY = "profile-points";

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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [POINTS_KEY] });
        }
    });
}

export function usePoints() {
    return useQuery({
        queryKey: [POINTS_KEY],
        queryFn: getPoints
    });
}