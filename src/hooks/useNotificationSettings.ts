import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddChannelType, getNotificaitonSettings, RemoveChannelType} from "@/service/notificationService.ts";
import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {ChannelType} from "@/model/notificationSettings.ts";

const NOTIFICATIONS_SETTINGS_KEY = "notification settings";

export function useNotificationSettings() {
    const {isAuthenticated, isInitialised} = useContext(securityContext)

    const {isLoading, isError, refetch, data: channelTypes} = useQuery({
        queryKey: [NOTIFICATIONS_SETTINGS_KEY],
        queryFn: getNotificaitonSettings,
        enabled: isAuthenticated() && isInitialised,
    })

    return {isLoading, isError, refetch, channelTypes}
}

export function useAddChannelType() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,
        error
    } = useMutation(
        {
            mutationFn: (channelType: ChannelType) => {
                return AddChannelType(channelType)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [NOTIFICATIONS_SETTINGS_KEY]});
            }
        })

    return {
        isPending,
        isError,
        AddChannelType: mutateAsync,
        error
    }
}

export function useRemoveChannelType() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,
        error
    } = useMutation(
        {
            mutationFn: (channelType: ChannelType) => {
                return RemoveChannelType(channelType)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [NOTIFICATIONS_SETTINGS_KEY]});
            }
        })

    return {
        isPending,
        isError,
        RemoveChannelType: mutateAsync,
        error
    }
}
