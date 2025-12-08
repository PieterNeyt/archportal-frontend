
export interface Notification {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    notificationType: NotificationType
}

export enum NotificationType {
    CHAT="CHAT",
    SYSTEM="SYSTEM",
    ACHIEVEMENT="ACHIEVEMENT",
    GAME_INVITE="GAME_INVITE",
    FRIEND_REQUEST="FRIEND_REQUEST",
    TURN_REMINDER="TURN_REMINDER"
}