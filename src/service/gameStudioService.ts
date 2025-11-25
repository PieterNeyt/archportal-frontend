import axios from "axios";
import {CreateGameStudio, GameStudio, GameStudioStatus} from "@/model/GameStudio.ts";


export async function AddGameStudio(newGameStudio: CreateGameStudio): Promise<GameStudio> {
    const {data: gameStudio} = await axios.post<GameStudio>(`/api/gamestudio`, newGameStudio)
    return gameStudio
}

export async function getMyStudioStatus(): Promise<GameStudioStatus> {
    const {data: gameStudioStatus} = await axios.get<GameStudioStatus>(`/api/gamestudio/me`);
    return gameStudioStatus;
}