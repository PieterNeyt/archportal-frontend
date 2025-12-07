import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getFirstFiveNotificaiton,
    getNotificaitonAmount,
    getNotificaitons,
    RemoveNotification
} from "@/service/notificationService.ts";

export function useFirstFiveNotifications() {
    const {isAuthenticated,isInitialised}= useContext(securityContext)

    const {isLoading, isError, refetch, data: notifications} = useQuery({
        queryKey: ["firstFiveNotification"],
        queryFn: getFirstFiveNotificaiton,
        enabled: isAuthenticated() && isInitialised,
    })

    return {isLoading, isError, refetch, notifications}
}

export function useNotifications() {
    const {isAuthenticated,isInitialised}= useContext(securityContext)

    const {isLoading, isError, refetch, data: notifications} = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotificaitons,
        enabled: isAuthenticated() && isInitialised,
    })

    return {isLoading, isError, refetch, notifications}
}

export function useNotificationAmount() {
    const {isAuthenticated,isInitialised}= useContext(securityContext)

    const {isLoading, isError, refetch, data: notificationsAmount} = useQuery({
        queryKey: ["amountOfNotifications"],
        queryFn: getNotificaitonAmount,
        enabled: isAuthenticated() && isInitialised,
    })

    return {isLoading, isError, refetch, notificationsAmount}
}


export function useRemoveNotification() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (notifiactionId: string) => {
                return RemoveNotification(notifiactionId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['amountOfNotifications']});
                queryClient.invalidateQueries({queryKey: ['notifications']});
                queryClient.invalidateQueries({queryKey: ['firstFiveNotification']});
            }
        })

    return {
        isPending,
        isError,
        RemoveNotification: mutateAsync
    }
}