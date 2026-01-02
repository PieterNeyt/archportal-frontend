import axios from "axios";
import {ProfileSyncDto} from "@/model/profileSyncDto.ts";

export async function getFriends(): Promise<ProfileSyncDto[]> {
    const {data: friends} = await axios.get<ProfileSyncDto[]>("/api/profile/friends");
    return friends;
}

export async function getFriendsFromProfileId(profileId:string): Promise<ProfileSyncDto[]> {
    const {data: friends} = await axios.get<ProfileSyncDto[]>(`/api/profile/${profileId}/friends`);
    return friends;
}

export async function sendFriendRequest(gamertag: string): Promise<void> {
    const {data: profile} = await axios.post("/api/profile/friend-request", {
        gamerTag: gamertag,
    })
    return profile;
}

export async function getIncomingFriendRequests(): Promise<ProfileSyncDto[]> {
    const {data: profiles} = await axios.get<ProfileSyncDto[]>("/api/profile/friend-requests/incoming");
    return profiles;
}

export async function getOutgoingFriendRequests(): Promise<ProfileSyncDto[]> {
    const {data: profiles} = await axios.get<ProfileSyncDto[]>("/api/profile/friend-requests/outgoing");
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

export async function removeFriend(gamertag: string): Promise<void> {
    await axios.delete("/api/profile/friends", {
        data: {
            gamerTag: gamertag
        }
    })
}