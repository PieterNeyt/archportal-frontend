import axios from "axios";
import {LibraryGame} from "@/model/library";

export async function getLibrary(): Promise<LibraryGame[]> {
    const {data} = await axios.get<LibraryGame[]>(
        `/api/profile/library`
    );
    return data;
}