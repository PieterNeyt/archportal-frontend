import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getChatRoom, getChatRooms} from "@/service/chatService.ts";

const CHATROOMS = "chat rooms";
const CHATROOM = "chat room";

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
        queryKey: [CHATROOM, id],
        queryFn: () => getChatRoom(id),
        enabled: isAuthenticated() && isInitialised
    })
    return {isLoading, isError, chatRoom, refetch}
}