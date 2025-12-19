import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button} from "@heroui/button";
import {useSendPartyInvite} from "@/hooks/useParties.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";
import {CircularProgress} from "@heroui/progress";
import {AlertTriangle} from "lucide-react";

interface AddFriendCardProps {
    gamerTag: string;
    icon: string;
    hasInvite: boolean;
}

export default function InviteFriendCard({gamerTag, icon, hasInvite}: AddFriendCardProps) {
    const send = useSendPartyInvite();

    useToastEffect(send, "Send friend request", "Failed to send friend request", "Successfully send a friend request to " + gamerTag + ".");

    const getButtonContent = () => {
        if (send.isPending) return <CircularProgress size="sm" color="default"/>;
        if (send.isError) return <AlertTriangle size={18}/>;
        if (hasInvite) return "Pending"
        return "Invite";
    };

    const getButtonColour = () => {
        if (send.isError) return "danger";
        if (hasInvite) return "default";
        return "success";
    }

    return (
        <div
            className="group flex items-center justify-between p-3 rounded-xl border border-white/10
                       bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all
                       duration-300 shadow-lg"
        >
            <User
                avatarProps={{
                    src: icon,
                    fallback: (
                        <Avatar
                            showFallback
                        />
                    ),
                    name: gamerTag,
                    className: "w-10 h-10 flex-shrink-0 border-1 border-white/20"
                }}
                name={gamerTag}

                classNames={{
                    name: "text-sm font-semibold text-white truncate",
                    wrapper: "flex-1 min-w-0 ml-2"
                }}
            />

            <Button
                isIconOnly={send.isPending || send.isError}
                isLoading={send.isPending}
                disabled={send.isPending || hasInvite}
                size="sm"
                color={getButtonColour()}
                variant="shadow"
                onPress={() => send.sendPartyInvite(gamerTag)}
                className="font-bold px-4"
            >
                {getButtonContent()}
            </Button>
        </div>
    );
}