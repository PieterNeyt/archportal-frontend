import {ProfileSyncDto} from "@/model/profileSyncDto.ts";

export interface User extends ProfileSyncDto {
    hasStudio: boolean;
    studioId: string | undefined;
    name: string | undefined;
    roles: string[];
}