import {ProfileSyncDto} from "@/model/profileSyncDto.ts";
import {Avatar, Chip} from "@heroui/react";

interface ProfileSettingHeaderProps {
    profile: ProfileSyncDto;
}

export function ProfileSettingHeader({profile}: ProfileSettingHeaderProps) {
    return (
        <div className="flex gap-5 items-center">
            <Avatar
                isBordered
                color="primary"
                src={profile?.icon}
                className="w-24 h-24 text-large ring-offset-black"
                name={profile?.firstName}
            />
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    {profile?.firstName} {profile?.lastName}
                </h1>
                <Chip
                    color="secondary"
                    variant="shadow"
                    size="sm"
                    className="bg-purple-500/20 border border-purple-500/30"
                >
                    @{profile?.gamerTag}
                </Chip>
            </div>
        </div>
    )
}