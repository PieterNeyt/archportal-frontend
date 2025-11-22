import {Game} from "@/model/game.ts";
import axios from "axios";

export async function getGames(): Promise<Game[]> {
    const {data: games} = await axios.get<Game[]>('/api/shop/games');
    return games;
}