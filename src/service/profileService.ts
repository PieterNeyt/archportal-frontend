import {Profile} from "@/model/profile.ts";
import axios from "axios";

export async function getProfile(): Promise<ProfileSyncDto> {
    const {data: profile} = await axios.get<ProfileSyncDto>(`/api/profile/sync`);
    return profile;
}

export async function getAllProfileWithId(profileId:string): Promise<ProfileDto> {
    const {data: profile} = await axios.get<ProfileDto>(`/api/profile/${profileId}`);
export async function syncProfile(): Promise<Profile> {
    const {data: profile} = await axios.put<Profile>(`/api/profile/sync`);
    return profile;
}

export async function getProfile(): Promise<Profile> {
    const {data: profile} = await axios.get<Profile>(`/api/profile`);
    return profile;
}

export async function getAllProfile(): Promise<ProfileDto> {
    const {data: profile} = await axios.get<ProfileDto>(`/api/profile`);
    return profile;
}

export async function getGamesFromProfileId(profileId:string): Promise<LibraryGame[]> {
    const {data: games} = await axios.get<LibraryGame[]>(`/api/profile/${profileId}/library`);
    return games;
}

export async function updateSectionVisibility(sections:SectionDto[]): Promise<SectionDto[]> {
    const {data: games} = await axios.put<SectionDto[]>(`/api/profile/section-visibility`, sections);
    return games;
}

export async function toggleBenefit(benefitId: string) {
    const {data} = await axios.put<Profile>(`/api/profile/benefits/${benefitId}/toggle`);
    return data;
}