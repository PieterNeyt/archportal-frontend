import {User} from "@heroui/user";
import {Tooltip} from "@heroui/tooltip";
import {CheckCircle2, CircleDashed, Crown} from "lucide-react";
import {Chip} from "@heroui/chip";
import {useBenefits} from "@/hooks/useBenefits.ts";
import {useMemo} from "react";

interface PartyMemberContentProps {
    canTriggerKick: boolean;
    gamerTag: string;
    isLeader: boolean;
    icon: string;
    isReady: boolean;
    isSelf: boolean;
    activeUsernameColorId?: string;
}

export default function PartyMemberContent({
                                               canTriggerKick,
                                               gamerTag,
                                               isLeader,
                                               isReady,
                                               icon,
                                               isSelf,
                                               activeUsernameColorId
                                           }: PartyMemberContentProps) {
    const { data: benefits } = useBenefits();

    const activeColor = useMemo(() => {
        if (!activeUsernameColorId || !benefits) return null;
        return benefits.find(b => b.id === activeUsernameColorId)?.configuration;
    }, [activeUsernameColorId, benefits]);

    return (
        <div
            role={canTriggerKick ? "button" : "gridcell"}
            className={`w-full flex justify-between p-2 rounded-xl transition-all duration-200 border border-transparent 
                ${canTriggerKick
                ? "hover:bg-danger/5 hover:border-danger/20 cursor-pointer"
                : "hover:bg-white/5"
            }`}
        >
            <div className="flex-1 min-w-0">
                <User
                    name={
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span
                                className={`font-bold truncate ${!activeColor && (!isSelf ? "text-primary" : "text-white")}`}
                                style={activeColor ? { color: activeColor } : {}}
                            >
                                {gamerTag}
                            </span>
                            {isLeader && (
                                <Tooltip
                                    content="Squad Leader"
                                    showArrow
                                    placement="top"
                                    classNames={{
                                        base: "before:bg-white/10",
                                        content: "bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1 text-xs font-bold rounded-lg shadow-xl"
                                    }}
                                    delay={0}
                                    closeDelay={0}
                                >
                                    <Crown size={14} className="text-warning fill-warning/20 shrink-0 cursor-help"/>
                                </Tooltip>
                            )}
                        </div>
                    }
                    avatarProps={{
                        src: icon,
                        isBordered: isLeader,
                        color: isLeader ? "warning" : "default",
                        className: "w-10 h-10 shrink-0",
                    }}
                />
            </div>

            <div className="flex justify-end shrink-0 pl-2">
                <Chip
                    startContent={isReady ? <CheckCircle2 size={14}/> :
                        <CircleDashed size={14} className="animate-spin-slow"/>}
                    variant="flat"
                    color={isReady ? "success" : "default"}
                    size="sm"
                    className={`capitalize border-1 font-medium ${!isReady && "bg-white/5 text-white/40 border-white/10"}`}
                >
                    {isReady ? "Ready" : "Waiting"}
                </Chip>
            </div>
        </div>
    );
}