import axios from "axios";
import {FriendToInvite, Member, Party, PartyInvite} from "@/model/party.ts";

export async function getParty(): Promise<Party | null> {
    try {
        const {data: party} = await axios.get<Party>("/api/party");
        return party;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;
        throw error;
    }
}

export async function getMembersOfParty(): Promise<Member[]> {
    try {
        const {data: members} = await axios.get<Member[]>("/api/party/members");
        return members;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return [];
        throw error;
    }
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
    const {data: friends} = await axios.get<FriendToInvite[]>("/api/party/friends");
    return friends;
}

export async function getInvitedParties(): Promise<PartyInvite[]> {
    const {data: parties} = await axios.get<PartyInvite[]>("/api/party/invite");
    return parties;
}

export async function acceptPartyInvite(partyId: string): Promise<void> {
    await axios.delete(`/api/party/${partyId}/accept`)
}

export async function declinePartyInvite(partyId: string): Promise<void> {
    await axios.delete(`/api/party/${partyId}/decline`)
}