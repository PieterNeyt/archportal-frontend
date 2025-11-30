export interface CreateGameStudio {
    name: string;
    description: string;
    IBAN: string;
}

export interface GameStudioStatus {
    hasStudio: boolean;
    studioId: string | undefined;
    name: string | undefined;
}

export interface GameStudio {
    ownerId: string;
    name: string;
    studioId: string;
}