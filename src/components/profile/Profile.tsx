import {Button, Spinner, useDisclosure} from "@heroui/react";
import {Settings} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {ProfileHeader} from "@/components/profile/ProfileHeader.tsx";
import {ProfileGames} from "@/components/profile/ProfileGames.tsx";
import {ProfileAchievementList} from "@/components/profile/ProfileAchievementList.tsx";
import {ProfileFriendsList} from "@/components/profile/ProfileFriendsList.tsx";
import {ProfileDto, SectionDto} from "@/model/profileSyncDto.ts";
import {ProfileVisibilityModal} from "./ProfileVisibilityModal.tsx";
import {useUpdateSectionVisibility} from "@/hooks/useProfile.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";

export interface ProfileProps {
    profile:ProfileDto;
    isLoading: boolean;
    isError: boolean;
    isOwner: boolean;
}


export function Profile({ profile, isError, isLoading, isOwner }: ProfileProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isError:isErrorSV,isPending:isPendingSv,isSuccess,error,updateSectionVisibility} = useUpdateSectionVisibility()
    useToastEffect({isError:isErrorSV,isSuccess,error:error},"Updated Section Visibility","Unabailable to update Section Visibility","");
    const handleUpdateSettings = async (updatedSections: SectionDto[]) => {
        await updateSectionVisibility(updatedSections);
    };

    if (isLoading) return <div className="h-screen flex justify-center items-center bg-black"><Spinner color="primary" /></div>;
    if (isError || !profile) return <div className="h-screen flex justify-center items-center text-white">Error.</div>;

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
            <section className={`${GLASS_CARD_STYLES} p-8 relative border-white/10`}>
                <ProfileHeader profile={profile} />
                {isOwner && (
                    <Button isIconOnly variant="flat" className="absolute top-4 right-4 text-white" onPress={onOpen}>
                        <Settings size={20} />
                    </Button>
                )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <ProfileGames profileId={profile.id} />
                </div>
                <div className="lg:col-span-4 space-y-8">
                    <ProfileFriendsList profileId={profile.id} />
                    <ProfileAchievementList profileId={profile.id} />
                </div>
            </div>

            <ProfileVisibilityModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                initialSections={profile.sections}
                onSave={handleUpdateSettings}
                isLoading={isPendingSv}
            />
        </div>
    );
}