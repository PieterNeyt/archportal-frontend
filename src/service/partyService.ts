import axios from "axios";
import {Party} from "@/model/party.ts";
import {Profile} from "@/model/profile.ts";

export async function getParty(): Promise<Party> {
    const {data: party} = await axios.get<Party>("/api/party");
    return party;
}

export async function getMembersOfParty(): Promise<Profile[]> {
    const {data: members} = await axios.get<Profile[]>("/api/party/members");
    return members;
}

export async function createParty(): Promise<void> {
    await axios.post("/api/party");
}