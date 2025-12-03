import axios from "axios";
import {ChannelType, NotificationSettings} from "@/model/notificationSettings.ts";


export async function getNotificaitonSettings(): Promise<NotificationSettings> {
    const {data: channelTypes} = await axios.get<NotificationSettings>(`/api/notificationsettings`);
    return channelTypes;
}


export async function RemoveChannelType(channelType:ChannelType): Promise<NotificationSettings> {
    const {data: channelTypes} = await axios.put<NotificationSettings>(`/api/notificationsettings/channeltype/remove`,  { value: channelType });
    return channelTypes;
}

export async function AddChannelType(channelType:ChannelType): Promise<NotificationSettings> {
    const {data: channelTypes} = await axios.put<NotificationSettings>(`/api/notificationsettings/channeltype/add`,  { value: channelType });
    return channelTypes;
}

