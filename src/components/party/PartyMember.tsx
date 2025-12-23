import {User} from "@heroui/user";
import {AlertTriangle, CheckCircle2, CircleDashed, Crown} from "lucide-react";
import {Tooltip} from "@heroui/tooltip";
import {Chip} from "@heroui/chip";
import {Button} from "@heroui/button";
import {useKickFromParty} from "@/hooks/useParties.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";
import securityContext from "@/context/SecurityContext.ts";
import {useContext, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";

interface PartyMemberProps {
    icon: string,
    gamerTag: string,
    isLeader: boolean,
    isReady: boolean,
    canKick: boolean
}

export default function PartyMember({icon, gamerTag, isLeader, isReady, canKick}: PartyMemberProps) {
    const kick = useKickFromParty();
    const {loggedInUser} = useContext(securityContext);
    const [isOpen, setIsOpen] = useState(false);
    useToastEffect(kick, "Successfully kicked player from party", "", "");

    const canTriggerKick = canKick && loggedInUser?.gamerTag !== gamerTag;

    const CardContent = (
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
                                className={`font-bold truncate ${loggedInUser?.gamerTag !== gamerTag ? "text-primary" : "text-white"}`}>
                                {gamerTag}
                            </span>
                            {isLeader && (
                                <Tooltip content="Squad Leader">
                                    <Crown size={14} className="text-warning fill-warning/20 shrink-0"/>
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

    if (!canTriggerKick) {
        return CardContent;
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            placement="bottom"
            showArrow
            classNames={{
                content: "bg-[#1a1a1e] border border-white/10 p-4 shadow-2xl",
            }}
        >
            <PopoverTrigger>
                {CardContent}
            </PopoverTrigger>
            <PopoverContent>
                <div className="space-y-4 flex flex-col items-center min-w-[180px]">
                    <div className="p-3 bg-danger/10 rounded-full">
                        <AlertTriangle size={24} className="text-danger"/>
                    </div>
                    <div className="text-center">
                        <p className="text-base font-bold text-white">Kick Player?</p>
                        <p className="text-xs text-white/40 mt-1">
                            Remove <span className="text-white font-semibold">{gamerTag}</span> from the party?
                        </p>
                    </div>
                    <div className="flex gap-2 w-full pt-2">
                        <Button
                            fullWidth
                            size="sm"
                            variant="light"
                            className="text-white/50"
                            onPress={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            size="sm"
                            color="danger"
                            className="font-bold shadow-lg shadow-danger/20"
                            onPress={async () => {
                                await kick.kickFromParty(gamerTag);
                                setIsOpen(false);
                            }}
                        >
                            Kick
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}