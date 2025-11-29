import {Profile} from "@/model/profile.ts";

export interface User extends Profile {
    hasStudio: boolean;
    studioId: string;
    name: string | undefined;
    roles: string[];
}