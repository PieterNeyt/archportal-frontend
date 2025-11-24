import {Profile} from "@/model/profile.ts";

export interface User extends Profile {
    hasStudio: boolean;
    name: string | undefined;
    roles: string[];
}