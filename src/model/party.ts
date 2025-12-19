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

export interface FriendToInvite {
    gamerTag: string;
    icon: string;
    hasInvite: boolean;
}

export interface PartyInvite {
    partyId: string;
    gamerTag: string;
    title: string;
    maxMembers: number;
    memberCount: number;
}