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