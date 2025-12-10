import axios from "axios";
import {GameStatistics} from "@/model/GameStatistics.ts";


export async function getGameStatistics(gameId: string): Promise<GameStatistics> {
    const url = `/api/analytics/gameStats/${gameId}`;
    const {data: statistics} = await axios.get<GameStatistics>(url);
    return statistics;
}