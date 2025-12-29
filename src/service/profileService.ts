import {Profile} from "@/model/profile.ts";
import axios from "axios";

export async function syncProfile(): Promise<Profile> {
    const {data: profile} = await axios.put<Profile>(`/api/profile/sync`);
    return profile;
}

export async function getProfile(): Promise<Profile> {
    const {data: profile} = await axios.get<Profile>(`/api/profile`);
    return profile;
}

export async function toggleBenefit(benefitId: string) {
    const {data} = await axios.put<Profile>(`/api/profile/benefits/${benefitId}/toggle`);
    return data;
}