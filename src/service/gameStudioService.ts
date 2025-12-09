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

export async function getGameStudio(): Promise<GameStudio> {
    const {data: studio} = await axios.get<GameStudio>(`/api/gamestudio`);
    return studio;
}

export async function updateGameStudio(gameStudio:GameStudio): Promise<GameStudio> {
    const {data: studio} = await axios.put<GameStudio>(`/api/gamestudio`,gameStudio);
    return studio;
}