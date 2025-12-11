import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getChatRoom, getChatRooms, sendMessage} from "@/service/chatService.ts";
import {SendMessage} from "@/model/chatRoom.ts";

const CHATROOMS = "chat rooms";
const MESSAGES = "messages";

export function useGetChatRooms() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: chatRooms, refetch} = useQuery({
        queryKey: [CHATROOMS],
        queryFn: () => getChatRooms(),
        enabled: isAuthenticated() && isInitialised
    });
    return {isLoading, isError, chatRooms, refetch};
}

export function useGetChatRoom(id: string) {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: chatRoom, refetch} = useQuery({
        queryKey: [MESSAGES, id],
        queryFn: () => getChatRoom(id),
        enabled: isAuthenticated() && isInitialised
    })
    return {isLoading, isError, chatRoom, refetch}
}

export function useSendMessage() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isError, isSuccess, error, reset} = useMutation({
        mutationFn: (message: SendMessage) => {
            return sendMessage(message);
        },
        onSuccess: (_data, variables) => {
            if (variables?.id) {
                queryClient.invalidateQueries({queryKey: [MESSAGES, variables.id]});
            } else {
                queryClient.invalidateQueries({queryKey: [MESSAGES]});
            }
        }
    })

    return {sendMessage: mutateAsync, isPending, isError, isSuccess, error, reset}
}