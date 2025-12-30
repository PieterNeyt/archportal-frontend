import axios from "axios";
import {CreateParty, FriendToInvite, Party, PartyInvite, PartyMembersResponse} from "@/model/party.ts";
import {GlobalGameDto} from "@/model/library";

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

export async function getMembersOfParty(): Promise<PartyMembersResponse> {
    try {
        const {data} = await axios.get<PartyMembersResponse>("/api/party/members");
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return { members: [], startedLobbyId: null };
        throw error;
    }
}

export async function createParty(party: CreateParty): Promise<void> {
    await axios.post("/api/party", party);
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

export async function leaveParty(): Promise<void> {
    await axios.patch("/api/party/leave")
}

export async function kickFromParty(gamertag: string): Promise<void> {
    await axios.patch(`/api/party/kick/${gamertag}`);
}

export async function getEligibleGames(): Promise<GlobalGameDto[]> {
    const { data } = await axios.get<GlobalGameDto[]>("/api/party/eligible-games");
    return data;
}

export async function selectPartyGame(gameId: string): Promise<void> {
    await axios.patch(`/api/party/select-game/${gameId}`);
}

export async function getSelectedGame(): Promise<GlobalGameDto | null> {
    try {
        const {data} = await axios.get<GlobalGameDto>("/api/party/selected-game");
        return data;
    } catch {
        return null;
    }
}
export async function toggleReady(): Promise<void> {
    await axios.patch("/api/party/ready");
}

export async function startPartyGame(): Promise<string> {
    const { data } = await axios.post<string>("/api/party/start-game");
    return data;
}
