export interface Party {
    title: string;
    maxMembers: number;
    hostIsYou: boolean;
}

export interface Member {
    gamerTag: string;
    icon: string;
    isLeader: boolean;
    isReady: boolean;
}