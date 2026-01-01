import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAllProfile,
    getAllProfileWithId,
    getGamesFromProfileId,
    getProfile,
    updateSectionVisibility
} from "@/service/profileService.ts";
import {SectionDto} from "@/model/profileSyncDto.ts";

const PROFILE_KEY = "profile"

export function useProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: () => getProfile(),
        enabled: false
    })
    return {isLoading, isError, refetch, profile}
}

export function useAllProfileWithId(profileId:string) {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY,"all"],
        queryFn: () => getAllProfileWithId(profileId)
    })
    return {isLoading, isError, refetch, profile}
}


export function useAllProfile() {
    const {isLoading, isError, refetch, data: profile} = useQuery({
        queryKey: [PROFILE_KEY,"all"],
        queryFn: () => getAllProfile()
    })
    return {isLoading, isError, refetch, profile}
}

export function useUpdateSectionVisibility() {
    const queryClient = useQueryClient();
    const {isPending, isError, isSuccess, error, mutateAsync} = useMutation({
        mutationFn: (sections: SectionDto[]) => {
            return updateSectionVisibility(sections);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PROFILE_KEY,"all"]})
        }
    })

    return {isPending, isError, isSuccess, error, updateSectionVisibility: mutateAsync}
}


export function useProfileGames(profileId: string) {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["GAMES",profileId],
        queryFn: () => getGamesFromProfileId(profileId)
    })
    return {isLoading, isError, refetch, games}
}