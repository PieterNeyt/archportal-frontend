import axios from "axios";
import {CreateGameStudio, GameStudioStatus} from "@/model/GameStudio.ts";


export async function AddGameStudio(newGameStudio: CreateGameStudio) {
    const {data: gameStudio} = await axios.post<CreateGameStudio>(`/api/gamestudio`, newGameStudio)
    return gameStudio
}

export async function getMyStudioStatus(): Promise<GameStudioStatus> {
    const {data: gameStudioStatus} = await axios.get<GameStudioStatus>(`/api/gamestudio/me`);
    return gameStudioStatus;
}