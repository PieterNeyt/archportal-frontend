import {useQuery} from "@tanstack/react-query";
import {getAllProfile, getGamesFromProfileId, getProfile} from "@/service/profileService.ts";

const PROFILE_KEY = "profile"

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: () => getProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}

export function useAllProfile(profileId:string) {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY,"all"],
        queryFn: () => getAllProfile(profileId)
    })
    return {isLoading, isError, refetch, profile}
}


export function useProfileGames(profileId: string) {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["GAMES",profileId],
        queryFn: () => getGamesFromProfileId(profileId)
    })
    return {isLoading, isError, refetch, games}
}