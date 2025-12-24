import {ProfileDto, ProfileSyncDto} from "@/model/profileSyncDto.ts";
import axios from "axios";

export async function getProfile(): Promise<ProfileSyncDto> {
    const {data: profile} = await axios.get<ProfileSyncDto>(`/api/profile`);
    return profile;
}

export async function getAllProfile(): Promise<ProfileDto> {
    const {data: profile} = await axios.get<ProfileDto>(`/api/profile/all`);
    return profile;
}