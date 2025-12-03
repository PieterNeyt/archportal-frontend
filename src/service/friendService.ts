import axios from "axios";
import {Profile} from "@/model/profile.ts";

export async function getFriends(): Promise<Profile[]> {
    const {data: friends} = await axios.get<Profile[]>("/api/friends");
    return friends;
}