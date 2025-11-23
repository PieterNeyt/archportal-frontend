import axios from "axios";
import {CreateGameStudio} from "@/model/createGameStudio.ts";


export async function AddGameStudio(newGameStudio: CreateGameStudio) {
    const {data: gameStudio} = await axios.post<CreateGameStudio>(`/api/gamestudio`, newGameStudio)
    return gameStudio
}