import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {useQuery} from "@tanstack/react-query";
import {getFirstFiveNotificaiton, getNotificaitonAmount, getNotificaitons} from "@/service/notificationService.ts";

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