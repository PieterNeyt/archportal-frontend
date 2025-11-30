import {Profile} from "@/model/profile.ts";
import axios from "axios";

export async function getProfile(): Promise<Profile> {
    const {data: profile} = await axios.get<Profile>(`/api/profile`);
    return profile;
}