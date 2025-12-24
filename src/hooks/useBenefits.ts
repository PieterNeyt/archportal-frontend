import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {buyBenefit, getBenefits, getPoints } from "@/service/benefitService";

export function useBenefits() {
    return useQuery({
        queryKey: ["benefits"],
        queryFn: getBenefits
    });
}

export function useBuyBenefit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => buyBenefit(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile-points"] });
        }
    });
}

export function usePoints() {
    return useQuery({
        queryKey: ["profile-points"],
        queryFn: getPoints
    });
}