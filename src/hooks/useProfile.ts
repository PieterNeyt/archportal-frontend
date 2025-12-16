import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/service/profileService.ts";

const PROFILE_KEY = "profile"

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: () => getProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}
