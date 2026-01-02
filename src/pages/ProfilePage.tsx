import {Profile} from "@/components/profile/Profile.tsx";
import {useAllProfile} from "@/hooks/useProfile.ts";


export function ProfilePage() {
    const {isLoading, isError, profile} = useAllProfile();
    return (<Profile profile={profile} isLoading={isLoading} isError={isError} isOwner={true} />);
}