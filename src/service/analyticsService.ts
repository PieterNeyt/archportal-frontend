import axios from "axios";
import {GameStatistics} from "@/model/GameStatistics.ts";


export async function getGameStatistics(profileId: string, gameId: string): Promise<GameStatistics> {
    const url = `/api/analytics/gameStats/${profileId}/${gameId}`;
    const {data: statistics} = await axios.get<GameStatistics>(url);
    return statistics;
}