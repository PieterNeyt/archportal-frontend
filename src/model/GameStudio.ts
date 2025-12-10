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
    id: string;
    ownerId: string;
    name: string;
    description: string;
    IBAN: string;
}