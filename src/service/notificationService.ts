import axios from "axios";
import {ChannelType, NotificationSettings} from "@/model/notificationSettings.ts";
import {Notification} from "@/model/notification.ts";


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


export async function getFirstFiveNotificaiton(): Promise<Notification[]> {
    const {data: notifications} = await axios.get<Notification[]>(`/api/notification/first/5`);
    return notifications;
}

export async function getNotificaitons(): Promise<Notification[]> {
    const {data: notifications} = await axios.get<Notification[]>(`/api/notification`);
    return notifications;
}

export async function getNotificaitonAmount(): Promise<number> {
    const {data: amountOfNotifications} = await axios.get<number>(`/api/notification/total`);
    return amountOfNotifications;
}

export async function RemoveNotification(notificationId:string): Promise<Notification> {
    const {data: notifiaction} = await axios.delete<Notification>(`/api/notification/read/${notificationId}`);
    return notifiaction;
}