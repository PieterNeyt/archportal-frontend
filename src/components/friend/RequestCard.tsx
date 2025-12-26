import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {AlertTriangle, Check, X} from "lucide-react";
import {useAcceptFriendRequest, useCancelFriendRequest, useDeclineFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import useToastEffect from "@/hooks/useToastEffect.ts";
import {useBenefits} from "@/hooks/useBenefits.ts";
import {useMemo} from "react";

interface RequestCardProps {
    icon: string;
    gamerTag: string;
    type: "incoming" | "outgoing";
    activeUsernameColorId?: string;
}

export default function RequestCard({icon, gamerTag, type, activeUsernameColorId}: RequestCardProps) {
    const accept = useAcceptFriendRequest();
    const decline = useDeclineFriendRequest();
    const cancel = useCancelFriendRequest();

    const { data: benefits } = useBenefits();

    useToastEffect(accept, "Friend request accepted", "Failed to accept friend request", "You accepted the friend request.");
    useToastEffect(decline, "Friend request declined", "Failed to accept friend request", "You declined the friend request.");
    useToastEffect(cancel, "Friend request cancelled", "Failed to accept friend request", "You canceled the friend request.");

    // Zoek de hex-kleurcode
    const activeColor = useMemo(() => {
        if (!activeUsernameColorId || !benefits) return undefined;
        return benefits.find(b => b.id === activeUsernameColorId)?.configuration;
    }, [activeUsernameColorId, benefits]);

    const getButtonContent = (action: typeof accept | typeof decline | typeof cancel, successIcon: JSX.Element, errorIcon: JSX.Element) => {
        if (action.isPending) return <CircularProgress size="sm" color="default"/>;
        if (action.isError) return errorIcon;
        return successIcon;
    }

    return (
        <div
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-md group"}
        >
            <User
                avatarProps={{
                    src: icon,
                    fallback: <Avatar showFallback />,
                    name: gamerTag,
                    className: "w-10 h-10 flex-shrink-0"
                }}
                name={
                    <span
                        className="text-base font-bold truncate transition-colors"
                        style={activeColor ? { color: activeColor } : { color: 'white' }}
                    >
                        {gamerTag}
                    </span>
                }
                classNames={{
                    wrapper: "flex-1 min-w-0"
                }}
            />

            <div className="flex items-center gap-2">
                {type === "incoming" && (
                    <ButtonGroup size={"sm"} className={"ml-4 flex-shrink-0 shadow-sm"}>
                        <Button
                            isIconOnly
                            disabled={accept.isPending || decline.isPending}
                            color="success"
                            variant="flat"
                            // Smooth hover: verhoogt de opacity van de achtergrond subtiel
                            className="bg-success/10 hover:bg-success/25 transition-colors duration-250 active:opacity-70"
                            aria-label={"Accept friend request"}
                            onPress={() => accept.acceptFriendRequest(gamerTag)}
                        >
                            {getButtonContent(accept, <Check size={20}/>, <AlertTriangle size={20}/>)}
                        </Button>
                        <Button
                            isIconOnly
                            disabled={decline.isPending || accept.isPending}
                            color="danger"
                            variant="flat"
                            // De border-l-1 zorgt voor een heel dun lijntje tussen de twee knoppen voor definitie
                            className="bg-danger/10 hover:bg-danger/25 border-l border-white/5 transition-colors duration-250 active:opacity-70"
                            aria-label={"Decline friend request"}
                            onPress={() => decline.declineFriendRequest(gamerTag)}
                        >
                            {getButtonContent(decline, <X size={20}/>, <AlertTriangle size={20}/>)}
                        </Button>
                    </ButtonGroup>
                )}

                {type === "outgoing" && (
                    <Button
                        isIconOnly
                        disabled={cancel.isPending}
                        size="sm"
                        color="danger"
                        variant="flat"
                        className="ml-4 bg-danger/10 hover:bg-danger/25 transition-colors duration-250 active:opacity-70 rounded-xl"
                        aria-label={"Cancel friend request"}
                        onPress={() => cancel.cancelFriendRequest(gamerTag)}
                    >
                        {getButtonContent(cancel, <X size={20}/>, <AlertTriangle size={20}/>)}
                    </Button>
                )}
            </div>
        </div>
    );
}