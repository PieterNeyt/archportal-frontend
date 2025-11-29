import {Profile} from "@/model/profile.ts";

export interface User extends Profile {
    hasStudio: boolean;
    studioId: string | undefined;
    name: string | undefined;
    roles: string[];
}