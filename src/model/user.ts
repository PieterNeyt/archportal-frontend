import {Profile} from "@/model/profile.ts";

export interface User extends Profile {
    roles: string[];
}