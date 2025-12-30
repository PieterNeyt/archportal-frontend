export interface Party {
    title: string;
    maxMembers: number;
    hostIsYou: boolean;
    chatRoomId: string;
    selectedGameId: string;
}

export interface Member {
    gamerTag: string;
    icon: string;
    isLeader: boolean;
    isReady: boolean;
    activeUsernameColorId?: string;
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

export interface CreateParty {
    title: string;
    maxMembers: number;
}