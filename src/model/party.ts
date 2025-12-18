export interface Party {
    title: string;
    maxMembers: number;
    hostIsYou: boolean;
    chatRoomId: string;
}

export interface Member {
    gamerTag: string;
    icon: string;
    isLeader: boolean;
    isReady: boolean;
}