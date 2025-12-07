import axios from "axios";
import {Profile} from "@/model/profile.ts";

export async function getFriends(): Promise<Profile[]> {
    const {data: friends} = await axios.get<Profile[]>("/api/profile/friends");
    return friends;
}

export async function sendFriendRequest(gamertag: string): Promise<void> {
    const {data: profile} = await axios.post("/api/profile/friend-request", {
        gamerTag: gamertag,
    })
    return profile;
}

export async function getIncomingFriendRequests(): Promise<Profile[]> {
    const {data: profiles} = await axios.get<Profile[]>("/api/profile/friend-requests/incoming");
    return profiles;
}

export async function getOutgoingFriendRequests(): Promise<Profile[]> {
    const {data: profiles} = await axios.get<Profile[]>("/api/profile/friend-requests/outgoing");
    return profiles;
}

export async function acceptFriendRequest(gamertag: string): Promise<void> {
    await axios.put("/api/profile/friend-request/accept", {
        gamerTag: gamertag
    })
}

export async function declineFriendRequest(gamertag: string): Promise<void> {
    await axios.delete("/api/profile/friend-request/decline", {
        data: {
            gamerTag: gamertag
        }
    })
}

export async function cancelFriendRequest(gamertag: string): Promise<void> {
    await axios.delete("/api/profile/friend-request/cancel", {
        data: {
            gamerTag: gamertag
        }
    })
}