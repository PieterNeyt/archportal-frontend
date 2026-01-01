import {Card, CardBody, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {AlertCircle, CheckCircle2, Gamepad2, LogOut, Rocket, Settings, Users, XCircle} from "lucide-react";
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
import {
    useGetLobbyInfo,
    useIsPLayerInLobby,
    useJoinMultiplayerLobby,
    useLeaveLobby,
    useStartMultiplayerGame
} from "@/hooks/useLobbies.ts";

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

    const {isInLobby: playerLobbyState} = useIsPLayerInLobby();
    const {lobby: activeLobbyInfo} = useGetLobbyInfo(startedLobbyId ?? "");

    const leave = useLeaveParty();
    const toggleReady = useToggleReady();
    const startPartyGame = useStartPartyGame();
    const joinLobbyMutation = useJoinMultiplayerLobby();
    const startMultiplayerMutation = useStartMultiplayerGame();
    const leaveLobbyMutation = useLeaveLobby();

    const [isExpanded, setIsExpanded] = useState(false);

    useToastEffect(leave, "You left the party", "Failed to leave the party", "");
    useToastEffect(toggleReady, "Status updated", "Failed to change ready status", "");
    useToastEffect(startPartyGame, "Lobby created!", "Failed to start party game", "");
    useToastEffect(joinLobbyMutation, "Joined lobby", "Failed to join lobby (maybe full?)", "");
    useToastEffect(startMultiplayerMutation, "Game launching...", "Failed to launch game", "");
    useToastEffect(leaveLobbyMutation, "Left lobby", "Failed to leave lobby", "");

    const totalMembers = members?.length ?? 0;
    const readyMembersCount = members?.filter(m => m.isReady).length ?? 0;
    const allReady = totalMembers > 0 && readyMembersCount === totalMembers;

    const isLeader = party?.hostIsYou;
    const myMemberData = members?.find(m => m.gamerTag === loggedInUser?.gamerTag);
    const amIReady = myMemberData?.isReady ?? false;

    const hasActiveLobby = !!startedLobbyId;
    const isAlreadyInAnyLobby = !!playerLobbyState?.isPlayerInLobby;
    const isInThisPartyLobby = isAlreadyInAnyLobby && String(playerLobbyState?.lobbyId) === String(startedLobbyId);
    const isInDifferentLobby = isAlreadyInAnyLobby && !isInThisPartyLobby;
    const isLobbyAccessible = activeLobbyInfo?.status === "OPEN";

    const handleReadyOrLaunch = async () => {
        if (hasActiveLobby || isInDifferentLobby) return;

        if (isLeader && allReady && selectedGame) {
            await startPartyGame.mutateAsync();
        } else {
            toggleReady.mutate();
        }
    };

    const handleEnterLobby = async () => {
        if (!startedLobbyId || isInDifferentLobby || !isLobbyAccessible) return;
        await joinLobbyMutation.joinLobby(startedLobbyId);
    };

    const handleEnterGame = async () => {
        if (!startedLobbyId || isInDifferentLobby) return;
        const response = await startMultiplayerMutation.startMultiplayer(startedLobbyId);
        if (response?.launchUrl) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
        }
    };

    const handleLeaveLobby = async () => {
        await leaveLobbyMutation.leaveLobby();
    };

    const getButtonText = () => {
        if (hasActiveLobby) {
            if (isInThisPartyLobby) return "Enter game";
            if (isInDifferentLobby) return "In another game";
            if (!isLobbyAccessible) return "Lobby Full";
            return "Enter Lobby";
        }

        if (isInDifferentLobby) return "In another game";
        if (!selectedGame) return "Select a game first";
        if (isLeader && allReady) return "Launch game";
        return amIReady ? "Not ready" : "Ready";
    };

    const getButtonColor = () => {
        if (isInDifferentLobby) return "warning";
        if (hasActiveLobby) {
            if (isInThisPartyLobby) return "success";
            if (!isLobbyAccessible) return "default";
            return "success";
        }
        if (!selectedGame) return "default";
        if (isLeader && allReady) return "success";
        if (amIReady) return "danger";
        return "primary";
    };

    const getButtonIcon = () => {
        if (hasActiveLobby || (isLeader && allReady)) return <Rocket size={20}/>;
        if (isInDifferentLobby) return <AlertCircle size={20}/>;
        return <CheckCircle2 size={20}/>;
    };

    const isBusy = toggleReady.isPending || startPartyGame.isPending || joinLobbyMutation.isPending || startMultiplayerMutation.isPending || leaveLobbyMutation.isPending;

    const isButtonDisabled = isBusy || (!selectedGame && !hasActiveLobby) || isInDifferentLobby || (hasActiveLobby && !isInThisPartyLobby && !isLobbyAccessible);

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
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer hover:bg-white/10
                        ${selectedGame ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10"}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <Gamepad2 size={14} className={selectedGame ? "text-primary" : "text-white/40"}/>
                        <span className="text-sm font-bold text-white">
                            {selectedGame ? selectedGame.title : "Select Game"}
                        </span>
                        <motion.div animate={{rotate: isExpanded ? 180 : 0}} className="text-white/60">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </motion.div>
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
                isLocked={hasActiveLobby}
            />

            <Divider className="mx-6 bg-white/5"/>

            <CardBody className="p-6">
                <div className="flex gap-3">
                    <InviteFriendModal/>

                    <Button
                        fullWidth
                        size="lg"
                        color={getButtonColor()}
                        isDisabled={isButtonDisabled}
                        onPress={
                            hasActiveLobby
                                ? (isInThisPartyLobby ? handleEnterGame : handleEnterLobby)
                                : handleReadyOrLaunch
                        }
                        className="font-bold uppercase shadow-lg"
                        startContent={getButtonIcon()}
                        isLoading={isBusy}
                    >
                        {getButtonText()}
                    </Button>

                    {(isInThisPartyLobby || isInDifferentLobby) && (
                        <Button
                            size="lg"
                            color="danger"
                            variant="bordered"
                            isDisabled={leaveLobbyMutation.isPending}
                            onPress={handleLeaveLobby}
                            className="font-bold uppercase shadow-lg min-w-fit px-6"
                            startContent={<XCircle size={20}/>}
                            isLoading={leaveLobbyMutation.isPending}
                        >
                            Leave Lobby
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}