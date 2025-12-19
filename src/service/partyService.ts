import axios from "axios";
import {FriendToInvite, Member, Party} from "@/model/party.ts";

export async function getParty(): Promise<Party> {
    const {data: party} = await axios.get<Party>("/api/party");
    return party;
}

export async function getMembersOfParty(): Promise<Member[]> {
    const {data: members} = await axios.get<Member[]>("/api/party/members");
    return members;
}

export async function createParty(): Promise<void> {
    await axios.post("/api/party");
}

export async function sendPartyInvite(gamerTag: string): Promise<void> {
    await axios.post("/api/party/invite", {
        gamerTag,
    })
}

export async function getFriendsForInvite(): Promise<FriendToInvite[]> {
    const {data: friends} = await axios.get("/api/party/friends");
    return friends;
}