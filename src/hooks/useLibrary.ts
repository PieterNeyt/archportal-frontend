import { useQuery } from "@tanstack/react-query";
import { getLibrary } from "@/service/libraryService";

const PROFILE_ID = "550e8400-e29b-41d4-a716-446655440000";

export function useLibrary() {
    const { isLoading, isError, refetch, data: games } = useQuery({
        queryKey: ["library", PROFILE_ID],
        queryFn: () => getLibrary()
    });

    return { isLoading, isError, refetch, games };
}