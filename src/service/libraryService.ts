import axios from "axios";
import { LibraryGame } from "@/model/library";

// voorlopig gwn hardcoded gebruiker
const PROFILE_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function getLibrary(): Promise<LibraryGame[]> {
    const { data } = await axios.get<LibraryGame[]>(
        `/api/profile/${PROFILE_ID}/library`
    );
    return data;
}