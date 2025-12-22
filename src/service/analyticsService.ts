import axios from "axios";
import {GameStatistics} from "@/model/gameStatistics.ts";
import {Achievement} from "@/model/game.ts";


export async function getGameStatistics(gameId: string): Promise<GameStatistics> {
    const url = `/api/analytics/gameStats/${gameId}`;
    const {data: statistics} = await axios.get<GameStatistics>(url);
    return statistics;
}

export async function getAchievemnts(gameId: string): Promise<Achievement[]> {
    const {data: achievements} = await axios.get<Achievement[]>(`/api/analytics/game/${gameId}/achievements`);
    return achievements;
}