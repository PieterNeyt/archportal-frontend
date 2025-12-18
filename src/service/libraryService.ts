import axios from "axios";
import {LibraryGame} from "@/model/library";

export async function getLibrary(): Promise<LibraryGame[]> {
    const {data} = await axios.get<LibraryGame[]>(
        `/api/profile/library`
    );
    return data;
}

export async function addGameToFavorite(gameId: string): Promise<void> {
    await axios.put(`/api/profile/library/${gameId}/add-favorite`);
}

export async function removeGameFromFavorite(gameId: string): Promise<void> {
    await axios.put(`/api/profile/library/${gameId}/remove-favorite`);
}