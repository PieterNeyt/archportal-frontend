import {Card, CardBody, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {ChevronDown, Gamepad2, LogOut, Play, Settings, Users} from "lucide-react";
import {Divider} from "@heroui/react";
import InviteFriendModal from "@/components/party/InviteFriendModal.tsx";
import {useGetEligibleGames, useLeaveParty, useSelectedGame} from "@/hooks/useParties.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";
import {useState} from "react";
import {motion} from "framer-motion";
import SelectGameDropdown from "@/components/party/SelectGameDropdown.tsx";

interface PartyCardProps {
    title: string;
    max: number;
    count: number;
}

export default function PartyCard({title, max, count}: PartyCardProps) {
    const leave = useLeaveParty();
    const {data: selectedGame} = useSelectedGame();
    const {data: games, isLoading: isLoadingGames} = useGetEligibleGames();
    const [isExpanded, setIsExpanded] = useState(false);

    useToastEffect(leave, "You left the party", "Failed to leave the party", "");

    return (
        <Card className="w-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <CardHeader className="flex justify-between items-center px-6 pt-6 pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Users size={20} className="text-primary"/>
                        </div>

                        <h2 className="font-bold text-white/90">
                            {title}
                        </h2>

                        <div className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
                            <span className="text-xs font-bold text-primary">
                                {count} / {max}
                            </span>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all cursor-pointer 
                            ${selectedGame
                            ? 'bg-primary/20 border-primary/30 hover:bg-primary/30'
                            : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                            Game:
                        </span>
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                            {selectedGame ? (
                                <>
                                    <Gamepad2 size={14} className="text-primary"/>
                                    {selectedGame.title}
                                </>
                            ) : (
                                "None Selected"
                            )}
                        </span>

                        <motion.div
                            animate={{rotate: isExpanded ? 180 : 0}}
                            transition={{duration: 0.3}}
                        >
                            <ChevronDown size={16} className="text-primary"/>
                        </motion.div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        className="text-white/60 hover:text-white"
                    >
                        <Settings size={18}/>
                    </Button>

                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        color="danger"
                        className="hover:bg-danger/20"
                        onPress={() => leave.leaveParty()}
                    >
                        <LogOut size={18}/>
                    </Button>
                </div>
            </CardHeader>

            <SelectGameDropdown
                isExpanded={isExpanded}
                selectedGameId={selectedGame?.id}
                games={games}
                isLoading={isLoadingGames}
            />

            <Divider className="mx-6 bg-white/5"/>

            <CardBody className="flex flex-row items-center gap-3">
                <InviteFriendModal/>
                <Button
                    color={selectedGame ? "success" : "default"}
                    variant="shadow"
                    disabled={!selectedGame}
                    className={`w-full font-bold text-lg h-12 shadow-primary/20 transition-all 
                        ${!selectedGame ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    startContent={<Play size={20}/>}
                >
                    {selectedGame ? "Start game" : "Select a game to start"}
                </Button>
            </CardBody>
        </Card>
    );
}