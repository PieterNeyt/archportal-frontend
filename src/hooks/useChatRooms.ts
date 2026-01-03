import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getChatRoom, getChatRooms, sendChatbotMessage, sendMessage} from "@/service/chatService.ts";
import {SendMessage} from "@/model/chatRoom.ts";

const CHATROOMS_KEY = "chat rooms";
const MESSAGES_KEY = "messages";

export function useGetChatRooms() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: chatRooms, refetch} = useQuery({
        queryKey: [CHATROOMS_KEY],
        queryFn: () => getChatRooms(),
        enabled: isAuthenticated() && isInitialised,
        refetchInterval: 5000
    });
    return {isLoading, isError, chatRooms, refetch};
}

export function useGetChatRoom(id: string) {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: chatRoom, refetch} = useQuery({
        queryKey: [MESSAGES_KEY, id],
        queryFn: () => getChatRoom(id),
        enabled: isAuthenticated() && isInitialised,
        refetchInterval: 1000
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
                queryClient.invalidateQueries({queryKey: [MESSAGES_KEY, variables.id]});
            } else {
                queryClient.invalidateQueries({queryKey: [MESSAGES_KEY]});
            }
        }
    })

    return {sendMessage: mutateAsync, isPending, isError, isSuccess, error, reset}
}

export function useSendChatbotMessage() {
    const {mutateAsync, isPending, isError, isSuccess, error, reset} = useMutation({
        mutationFn: (message: SendMessage) => {
            return sendChatbotMessage(message);
        }
    })
    return {sendMessage: mutateAsync, isPending, isError, isSuccess, error, reset}
}