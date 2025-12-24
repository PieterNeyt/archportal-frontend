export interface Achievement {
    achievementId: string;
    timeUnlocked: string;
}


export interface WinnerRecord {
    PlayedAt: string;
    Winner: string;
    SessionId: string;
}

export interface GameStatistics {
    gameId: string;
    profileId: string;
    totalPlayTimeMinutes: number;
    lastPlayedAt: Date;
    achievements: Achievement[];
    winnerRecords: WinnerRecord[];
}