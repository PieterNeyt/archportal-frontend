import axios from "axios";
import {Profile} from "@/model/profile.ts";

export async function getFriends(): Promise<Profile[]> {
    const {data: friends} = await axios.get<Profile[]>("/api/friends");
    return friends;
}

export async function sendFriendRequest(gamertag: string): Promise<void> {
    const {data: profile} = await axios.post("/api/friends/request", {
        gamerTag: gamertag,
    })
    return profile;
}

export async function getFriendRequests(): Promise<Profile[]> {
    const {data: profiles} = await axios.get<Profile[]>("/api/friends/requests");
    return profiles;
}

export async function acceptFriendRequest(gamertag: string): Promise<void> {
    await axios.put("/api/friends/accept", {
        gamerTag: gamertag,
    })
}