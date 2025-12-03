export interface NotificationSettings {
    channels: ChannelType[];
}


export enum ChannelType {
    IN_PLATFORM = "IN_PLATFORM",
    EMAIL = "EMAIL"
}