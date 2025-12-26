import {Profile} from "@/model/profile.ts";
import axios from "axios";

export async function getProfile(): Promise<Profile> {
    const {data: profile} = await axios.get<Profile>(`/api/profile`);
    return profile;
}

export async function toggleBenefit(benefitId: string, type: string, config: string, active: boolean) {
    const { data } = await axios.put<Profile>('/api/profile/benefits/toggle', {
        benefitId, type, config, active
    });
    return data;
}