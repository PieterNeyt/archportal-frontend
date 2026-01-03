import { ProfileSyncDto } from "@/model/profileSyncDto.ts";
import { Avatar } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface ProfileFriendItemProps {
    profile: ProfileSyncDto;
}

export function ProfileFriendItem ({profile}: ProfileFriendItemProps) {
    const navigate = useNavigate();

    return (
        <div
            key={profile.gamerTag}
            onClick={() => navigate(`/profile/${profile.id}`)}
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
                >
                    {profile.gamerTag}
                </span>
            </div>
        </div>
    );
}