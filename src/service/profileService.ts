import {ProfileDto, ProfileSyncDto, SectionDto} from "@/model/profileSyncDto.ts";
import axios from "axios";
import {LibraryGame} from "@/model/library.ts";

export async function getProfile(): Promise<ProfileSyncDto> {
    const {data: profile} = await axios.get<ProfileSyncDto>(`/api/profile/sync`);
    return profile;
}

export async function getAllProfileWithId(profileId:string): Promise<ProfileDto> {
    const {data: profile} = await axios.get<ProfileDto>(`/api/profile/${profileId}`);
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