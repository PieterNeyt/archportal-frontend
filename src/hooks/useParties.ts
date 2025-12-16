import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createParty, getParty} from "@/service/partyService.ts";

const PARTY_KEY = "party"

export function useParty() {
    const {isLoading, isError, data: party} = useQuery({
        queryKey: [PARTY_KEY],
        queryFn: () => getParty()
    });

    return {isLoading, isError, party};
}

export function useCreateParty() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError} = useMutation({
        mutationFn: () => {
            return createParty()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [PARTY_KEY]})
        }
    });
    return {isPending, isError, createParty: mutateAsync};
}