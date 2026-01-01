import {useParams} from "react-router-dom";
import {Profile} from "@/components/profile/Profile.tsx";
import {useAllProfileWithId} from "@/hooks/useProfile.ts";


export function ProfilePublicPage() {
    const {id} = useParams<{ id: string }>();
    const {isLoading, isError, profile} = useAllProfileWithId(id ?? "");

    return (<Profile profile={profile} isLoading={isLoading} isError={isError} />);
}