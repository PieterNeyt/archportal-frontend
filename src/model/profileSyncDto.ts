export interface ProfileSyncDto {
    firstName: string;
    lastName: string;
    gamerTag: string;
    icon: string;
    email: string;
    platformBenefits: string[];
    activeProfilePictureId?: string;
    activeUsernameColorId?: string;
}

export enum SectionType {
    GAMES = 'GAMES',
    FAVORITES = 'FAVORITES',
    STATISTICS = 'STATISTICS',
    FRIENDS = 'FRIENDS',
    ACHIEVEMENTS = 'ACHIEVEMENTS'
}

export enum Visibility {
    PUBLIC = 'PUBLIC',
    FRIENDS = 'FRIENDS',
    PRIVATE = 'PRIVATE'
}

export interface SectionDto {
    type: SectionType;
    visibility: Visibility;
}

export interface GameDto {
    gameId: string;
    isFavorite: boolean;
}

export interface ProfileDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    icon: string;
    gamerTag: string;
    platformPoints: number;
    activeProfilePictureId?: string;
    activeUsernameColorId?: string;
    games: GameDto[];
    sections: SectionDto[];
}


