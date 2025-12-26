import {AlertTriangle} from "lucide-react";
import {Button} from "@heroui/button";
import {useKickFromParty} from "@/hooks/useParties.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";
import securityContext from "@/context/SecurityContext.ts";
import {useContext, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import PartyMemberContent from "@/components/party/PartyMemberContent.tsx";

interface PartyMemberProps {
    icon: string,
    gamerTag: string,
    isLeader: boolean,
    isReady: boolean,
    canKick: boolean,
    activeUsernameColorId?: string
}

export default function PartyMember({icon, gamerTag, isLeader, isReady, canKick, activeUsernameColorId}: PartyMemberProps) {
    const kick = useKickFromParty();
    const {loggedInUser} = useContext(securityContext);
    const [isOpen, setIsOpen] = useState(false);
    useToastEffect(kick, "Successfully kicked player from party", "", "");

    const isSelf = loggedInUser?.gamerTag === gamerTag;
    const canTriggerKick = canKick && !isSelf;

    const CardContent = (
        <PartyMemberContent
            canTriggerKick={canTriggerKick}
            gamerTag={gamerTag}
            isLeader={isLeader}
            icon={icon}
            isReady={isReady}
            isSelf={isSelf}
            activeUsernameColorId={activeUsernameColorId} // DOORGEVEN
        />
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
                content: "bg-[#1a1a1e]/90 backdrop-blur-xl border border-white/10 p-4 shadow-2xl rounded-2xl",
            }}
        >
            <PopoverTrigger>
                <div className="w-full">{CardContent}</div>
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