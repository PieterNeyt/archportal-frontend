import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getFirstFiveNotificaiton,
    getNotificaitonAmount,
    getNotificaitons,
    RemoveNotification
} from "@/service/notificationService.ts";

const NOTIFICATIONS_KEY = "notifications";
const FIRST_5_NOTIFICATIONS_KEY = "first 5 notifications";
const AMOUNT_NOTIFICATIONS_KEY = "amount notifications";

export function useFirstFiveNotifications() {
    const {isAuthenticated, isInitialised} = useContext(securityContext)

    const {isLoading, isError, refetch, data: notifications} = useQuery({
        queryKey: [FIRST_5_NOTIFICATIONS_KEY],
        queryFn: getFirstFiveNotificaiton,
        enabled: isAuthenticated() && isInitialised,
        refetchInterval: 1000
    })

    return {isLoading, isError, refetch, notifications}
}

export function useNotifications() {
    const {isAuthenticated, isInitialised} = useContext(securityContext)

    const {isLoading, isError, refetch, data: notifications} = useQuery({
        queryKey: [NOTIFICATIONS_KEY],
        queryFn: getNotificaitons,
        enabled: isAuthenticated() && isInitialised,
    })

    return {isLoading, isError, refetch, notifications}
}

export function useNotificationAmount() {
    const {isAuthenticated, isInitialised} = useContext(securityContext)

    const {isLoading, isError, refetch, data: notificationsAmount} = useQuery({
        queryKey: [AMOUNT_NOTIFICATIONS_KEY],
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
                queryClient.invalidateQueries({queryKey: [AMOUNT_NOTIFICATIONS_KEY]});
                queryClient.invalidateQueries({queryKey: [NOTIFICATIONS_KEY]});
                queryClient.invalidateQueries({queryKey: [FIRST_5_NOTIFICATIONS_KEY]});
            }
        })

    return {
        isPending,
        isError,
        RemoveNotification: mutateAsync
    }
}