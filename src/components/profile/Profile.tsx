import {Button, Spinner, useDisclosure} from "@heroui/react";
import {AlertTriangle, Settings, ShieldCheck} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {ProfileHeader} from "@/components/profile/ProfileHeader.tsx";
import {ProfileGames} from "@/components/profile/ProfileGames.tsx";
import {ProfileAchievementList} from "@/components/profile/ProfileAchievementList.tsx";
import {ProfileFriendsList} from "@/components/profile/ProfileFriendsList.tsx";
import {ProfileDto, SectionType, Visibility} from "@/model/profileSyncDto.ts";
import {ProfileVisibilityModal} from "./ProfileVisibilityModal.tsx";
import {useIsProfileFriend} from "@/hooks/useFriends.ts";

export interface ProfileProps {
    profile: ProfileDto | undefined;
    isLoading: boolean;
    isError: boolean;
    isOwner: boolean;
}

export function Profile({profile, isError, isLoading, isOwner}: ProfileProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const {friends} = useIsProfileFriend(!isOwner && profile?.id ? profile.id : "");

    const getSectionVisibility = (sectionType: SectionType): Visibility => {
        const section = profile?.sections?.find(s => s.type === sectionType);
        return section ? section.visibility : Visibility.PRIVATE;
    };

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col justify-center items-center bg-black gap-4">
                <Spinner size="lg" color="primary" />
                <p className="text-white/20 uppercase tracking-[0.3em] font-bold text-xs">Loading Profile</p>
            </div>
        );
    }

    if (isError || !profile) {
        return (
            <div className="h-[70vh] flex flex-col justify-center items-center text-white gap-4">
                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="text-red-500" size={32} />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold uppercase tracking-tighter">Profile not found</h2>
                    <p className="text-white/40 text-sm">The profile you are looking for does not exist or is private.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            {isOwner && (
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 text-white/20">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Owner View</span>
                    </div>
                    <Button
                        size="sm"
                        variant="flat"
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full px-4"
                        startContent={<Settings size={16} />}
                        onPress={onOpen}
                    >
                        Profile Settings
                    </Button>
                </div>
            )}

            <section className={`${GLASS_CARD_STYLES} p-8 relative border-white/10 overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <ProfileHeader
                    profile={profile}
                    visibility={getSectionVisibility(SectionType.STATISTICS)}
                    isOwner={isOwner}
                    isFriend={!!friends}
                />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <ProfileGames
                        profileId={profile.id}
                        isOwner={isOwner}
                        isFriend={!!friends}
                        gameVisibility={getSectionVisibility(SectionType.GAMES)}
                        favoriteGameVisibility={getSectionVisibility(SectionType.FAVORITES)}
                    />
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <ProfileFriendsList
                        profileId={profile.id}
                        isOwner={isOwner}
                        isFriend={!!friends}
                        visibility={getSectionVisibility(SectionType.FRIENDS)}
                    />
                    <ProfileAchievementList
                        profileId={profile.id}
                        isOwner={isOwner}
                        isFriend={!!friends}
                        visibility={getSectionVisibility(SectionType.ACHIEVEMENTS)}
                    />
                </div>
            </div>

            <ProfileVisibilityModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                initialSections={profile.sections}
            />
        </div>
    );
}