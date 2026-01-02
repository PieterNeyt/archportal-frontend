import {ProfileDto} from "@/model/profileSyncDto.ts";
import {Avatar} from "@heroui/react";
import {useActiveUsernameColorFromProfileId} from "@/hooks/useBenefits.ts";

interface ProfileFriendItemProps {
    profile: ProfileDto;
}

export function ProfileFriendItem ({profile}: ProfileFriendItemProps) {
    const {profileColor} = useActiveUsernameColorFromProfileId(profile.id);

    return (
        <div
            key={profile.gamerTag}
            className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer group"
        >
            <Avatar
                src={profile.icon}
                size="sm"
                radius="md"
                className="border border-white/10"
            />
            <div className="flex flex-col min-w-0">
                <span
                    className="text-sm font-medium transition-colors truncate"
                    style={{ color: profileColor || 'rgba(255, 255, 255, 0.9)' }}
                >
                    {profile.gamerTag}
                </span>
            </div>
        </div>
    );
}