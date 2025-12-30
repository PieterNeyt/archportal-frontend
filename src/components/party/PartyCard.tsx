import {Card, CardBody, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {CheckCircle2, Gamepad2, LogOut, Rocket, Settings, Users} from "lucide-react";
import {Divider} from "@heroui/react";
import InviteFriendModal from "@/components/party/InviteFriendModal.tsx";
import {
    useGetEligibleGames,
    useGetPartyMembers,
    useLeaveParty,
    useParty,
    useSelectedGame,
    useStartPartyGame,
    useToggleReady
} from "@/hooks/useParties.ts";

import useToastEffect from "@/hooks/useToastEffect.ts";
import {useContext, useState} from "react";
import {motion} from "framer-motion";
import SelectGameDropdown from "@/components/party/SelectGameDropdown.tsx";
import securityContext from "@/context/SecurityContext.ts";
import {useStartMultiplayerGame} from "@/hooks/useLobbies.ts";

interface PartyCardProps {
    title: string;
    max: number;
    count: number;
}

export default function PartyCard({title, max, count}: PartyCardProps) {
    const {loggedInUser} = useContext(securityContext);

    const {party} = useParty();
    const {members, startedLobbyId} = useGetPartyMembers();
    const {data: selectedGame} = useSelectedGame();
    const {data: games, isLoading: isLoadingGames} = useGetEligibleGames();

    const leave = useLeaveParty();
    const toggleReady = useToggleReady();
    const startPartyGame = useStartPartyGame();
    const {startMultiplayer} = useStartMultiplayerGame();

    const [isExpanded, setIsExpanded] = useState(false);

    useToastEffect(leave, "You left the party", "Failed to leave the party", "");

    const totalMembers = members?.length ?? 0;
    const readyMembersCount = members?.filter(m => m.isReady).length ?? 0;
    const allReady = totalMembers > 0 && readyMembersCount === totalMembers;

    const isLeader = party?.hostIsYou;
    const myMemberData = members?.find(m => m.gamerTag === loggedInUser?.gamerTag);
    const amIReady = myMemberData?.isReady ?? false;

    const hasActiveLobby = !!startedLobbyId;

    const handleReadyOrLaunch = async () => {
        if (hasActiveLobby) return;

        if (isLeader && allReady && selectedGame) {
            await startPartyGame.mutateAsync();
        } else {
            toggleReady.mutate();
        }
    };

    const handleEnterGame = async () => {
        if (!startedLobbyId) return;

        const response = await startMultiplayer(startedLobbyId);

        if (response?.launchUrl) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
        }
    };

    const getButtonText = () => {
        if (hasActiveLobby) return "Enter game";
        if (!selectedGame) return "Select a game first";
        if (isLeader && allReady) return "Launch game";
        return amIReady ? "Not ready" : "Ready";
    };

    const getButtonColor = () => {
        if (hasActiveLobby) return "secondary";
        if (!selectedGame) return "default";
        if (isLeader && allReady) return "success";
        if (amIReady) return "danger";
        return "primary";
    };

    const getButtonIcon = () => {
        if (hasActiveLobby) return <Rocket size={20} />;
        if (isLeader && allReady) return <Rocket size={20} />;
        return <CheckCircle2 size={20} />;
    };

    return (
        <Card className="w-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <CardHeader className="flex justify-between items-center px-6 pt-6 pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg shadow-[0_0_15px_rgba(0,112,243,0.2)]">
                            <Users size={20} className="text-primary"/>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-bold text-white/90 tracking-tight">{title}</h2>
                            <span className="text-xs font-bold text-primary/60">
                                {count} / {max} MEMBERS
                            </span>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all
                            ${hasActiveLobby ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                            ${selectedGame ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                        onClick={() => !hasActiveLobby && setIsExpanded(!isExpanded)}
                    >
                        <Gamepad2 size={14} className={selectedGame ? "text-primary" : "text-white/40"} />
                        <span className="text-sm font-bold text-white">
                            {selectedGame ? selectedGame.title : "Select Game"}
                        </span>
                        {!hasActiveLobby && (
                            <motion.div animate={{rotate: isExpanded ? 180 : 0}}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                            Party Status
                        </p>
                        <p className={`text-sm font-black ${allReady ? "text-success" : "text-warning"}`}>
                            {readyMembersCount}/{totalMembers} READY
                        </p>
                    </div>

                    <div className="flex gap-2 border-l border-white/10 pl-4">
                        <Button isIconOnly variant="light" radius="full" size="sm" className="text-white/40">
                            <Settings size={18}/>
                        </Button>
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            color="danger"
                            onPress={() => leave.leaveParty()}
                        >
                            <LogOut size={18}/>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <SelectGameDropdown
                isExpanded={isExpanded}
                selectedGameId={selectedGame?.id}
                games={games}
                isLoading={isLoadingGames}
            />

            <Divider className="mx-6 bg-white/5"/>

            <CardBody className="p-6">
                <div className="flex gap-3">
                    <InviteFriendModal/>

                    <Button
                        fullWidth
                        size="lg"
                        color={getButtonColor()}
                        disabled={
                            (!selectedGame && !hasActiveLobby) ||
                            toggleReady.isPending ||
                            startPartyGame.isPending
                        }
                        onPress={hasActiveLobby ? handleEnterGame : handleReadyOrLaunch}
                        className="font-bold uppercase"
                        startContent={getButtonIcon()}
                    >
                        {getButtonText()}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
