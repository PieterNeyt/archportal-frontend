import {Spinner} from "@heroui/react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {ProfileHeader} from "@/components/profile/ProfileHeader.tsx";
import {useAllProfileWithId} from "@/hooks/useProfile.ts";
import {useParams} from "react-router-dom";
import {ProfileGames} from "@/components/profile/ProfileGames.tsx";
import {ProfileAchievementList} from "@/components/profile/ProfileAchievementList.tsx";
import {ProfileFriendsList} from "@/components/profile/ProfileFriendsList.tsx";
import {ProfileDto} from "@/model/profileSyncDto.ts";

interface ProfileProps {
    profile: ProfileDto | undefined;
    isError: boolean;
    isLoading: boolean;
}

export function Profile({profile,isError,isLoading}: ProfileProps) {
    if (isLoading) return (
        <div className="h-screen flex justify-center items-center bg-black">
            <Spinner color="primary" size="lg" label="Loading Profile..."/>
        </div>
    );

    if (isError || !profile) return (
        <div className="h-screen flex justify-center items-center text-white">
            <p>Error loading profile. Please try again later.</p>
        </div>
    );

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-appearance-in">
            {/* Header Section */}
            <section className={`${GLASS_CARD_STYLES} p-6 sm:p-8 relative overflow-hidden group border-white/10`}>
                <ProfileHeader profile={profile}/>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Games */}
                <div className="lg:col-span-8 space-y-8">
                    <ProfileGames profileId={profile.id}/>
                </div>

                {/* RIGHT COLUMN: Social & Stats */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="space-y-4">
                        <ProfileFriendsList profileId={profile.id}/>
                    </section>


                    {/* Achievements Section - Alleen tonen als er achievements zijn */}
                    <section className="space-y-4">
                        <ProfileAchievementList profileId={profile.id}/>
                    </section>
                </div>
            </div>
        </div>
    );
}