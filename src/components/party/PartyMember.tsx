import {User} from "@heroui/user";
import {CheckCircle2, CircleDashed, Crown} from "lucide-react";
import {Tooltip} from "@heroui/tooltip";
import {Chip} from "@heroui/chip";

interface PartyMemberProps {
    icon: string,
    gamerTag: string,
    isLeader: boolean,
    isReady: boolean
}

export default function PartyMember({icon, gamerTag, isLeader, isReady}: PartyMemberProps) {
    return (
        <div
            className={"w-full flex justify-between p-3 rounded-xl hover:bg-white/5 hover:border-white/5"}
        >
            <User
                name={
                    <div className={"flex items-center gap-2"}>
                        <span className={"font-bold text-white"}>{gamerTag}</span>
                        {isLeader && (
                            <Tooltip content="Squad Leader">
                                <Crown size={14} className="text-warning fill-warning/20"/>
                            </Tooltip>
                        )}
                    </div>
                }
                avatarProps={{
                    src: icon,
                    isBordered: isLeader,
                    color: isLeader ? "warning" : "default",
                    className: "w-10 h-10",
                }}
            />

            <div className="flex items-center gap-3">
                {isReady ? (
                    <Chip
                        startContent={<CheckCircle2 size={14}/>}
                        variant="flat"
                        color="success"
                        size="sm"
                        className="capitalize border-1 border-success/20"
                    >
                        Ready
                    </Chip>
                ) : (
                    <Chip
                        startContent={<CircleDashed size={14} className="animate-spin-slow"/>}
                        variant="flat"
                        className="bg-white/5 text-white/40 border-1 border-white/10 capitalize"
                        size="sm"
                    >
                        Waiting
                    </Chip>
                )}
            </div>
        </div>
    )
}