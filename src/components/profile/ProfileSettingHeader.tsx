import {Profile} from "@/model/profile.ts";
import {Avatar, Chip} from "@heroui/react";
import {useBenefits} from "@/hooks/useBenefits.ts";
import {useMemo} from "react";

interface ProfileSettingHeaderProps {
    profile: Profile;
}

export function ProfileSettingHeader({profile}: ProfileSettingHeaderProps) {
    const { data: benefits } = useBenefits();

    const activeColor = useMemo(() => {
        if (!profile?.activeUsernameColorId || !benefits) return null;
        return benefits.find(b => b.id === profile.activeUsernameColorId)?.configuration;
    }, [profile?.activeUsernameColorId, benefits]);

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
                    variant={activeColor ? "bordered" : "shadow"}
                    size="sm"
                    className={!activeColor ? "bg-purple-500/20 border border-purple-500/30" : ""}
                    style={activeColor ? {
                        color: activeColor,
                        borderColor: activeColor,
                        backgroundColor: `${activeColor}15`
                    } : {}}
                >
                    @{profile?.gamerTag}
                </Chip>
            </div>
        </div>
    )
}