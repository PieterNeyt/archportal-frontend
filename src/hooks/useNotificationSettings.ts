import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddChannelType, getNotificaitonSettings, RemoveChannelType} from "@/service/notificationService.ts";
import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {AxiosError} from "axios";
import {addToast} from "@heroui/toast";
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

    } = useMutation(
        {
            mutationFn: (channelType: ChannelType) => {
                return AddChannelType(channelType)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [NOTIFICATIONS_SETTINGS_KEY]});
            },
            onError: (error) => {
                let errorMessage = "Failed to add to cart";

                if (error instanceof AxiosError && error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                addToast({
                    title: "Failed to add Channel Type",
                    description: errorMessage,
                    color: "danger",
                })
            }
        })

    return {
        isPending,
        isError,
        AddChannelType: mutateAsync
    }
}

export function useRemoveChannelType() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (channelType: ChannelType) => {
                return RemoveChannelType(channelType)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [NOTIFICATIONS_SETTINGS_KEY]});
            },
            onError: (error) => {
                let errorMessage = "Failed to add to cart";

                if (error instanceof AxiosError && error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                addToast({
                    title: "Failed to remove Channel Type",
                    description: errorMessage,
                    color: "danger",
                })
            }
        })

    return {
        isPending,
        isError,
        RemoveChannelType: mutateAsync
    }
}
