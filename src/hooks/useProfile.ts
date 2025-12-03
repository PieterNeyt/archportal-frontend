import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/service/profileService.ts";

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}
