import { AnimatePresence, motion } from "framer-motion";
import { useSelectGame } from "@/hooks/useParties.ts";
import { Image, Card, CardFooter } from "@heroui/react";
import { CheckCircle2, Gamepad2, Lock } from "lucide-react";
import { GlobalGameDto } from "@/model/library";

interface SelectGameDropdownProps {
    isExpanded: boolean;
    selectedGameId?: string;
    games?: GlobalGameDto[];
    isLoading: boolean;
    isLocked: boolean;
}

export default function SelectGameDropdown({
                                               isExpanded,
                                               selectedGameId,
                                               games,
                                               isLoading,
                                               isLocked,
                                           }: SelectGameDropdownProps) {
    const { mutate: selectGame } = useSelectGame();

    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-gradient-to-b from-white/5 to-transparent border-t border-white/10"
                >
                    <div className="px-6 py-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Gamepad2 size={14} className="text-primary/60" />
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                                Available Games
                            </p>

                            {!isLoading && games && (
                                <span className="ml-auto text-xs text-white/30 font-semibold">
                                    {games.length} {games.length === 1 ? "game" : "games"}
                                </span>
                            )}
                        </div>

                        {isLocked && (
                            <div className="mb-4 flex items-center gap-2 text-xs text-warning font-semibold">
                                <Lock size={14} />
                                Game selection is locked because the lobby has started
                            </div>
                        )}

                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="h-40 bg-white/5 animate-pulse rounded-xl border border-white/5"
                                    />
                                ))}
                            </div>
                        ) : games && games.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: { staggerChildren: 0.05 },
                                    },
                                }}
                            >
                                {games.map((game) => {
                                    const isSelected = selectedGameId === game.id;

                                    return (
                                        <motion.div
                                            key={game.id}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                        >
                                            <Card
                                                isPressable={!isLocked}
                                                onPress={() => {
                                                    if (isLocked) return;
                                                    selectGame(game.id);
                                                }}
                                                className={`relative group overflow-hidden transition-all duration-300
                                                    ${
                                                    isSelected
                                                        ? "border-2 border-success shadow-lg shadow-success/30 scale-[1.02]"
                                                        : isLocked
                                                            ? "border-2 border-white/10 opacity-40 cursor-not-allowed"
                                                            : "border-2 border-white/5 hover:border-primary/50 hover:scale-[1.02]"
                                                }`}
                                            >
                                                <div className="relative overflow-hidden">
                                                    <Image
                                                        alt={game.title}
                                                        src={game.imageUrl}
                                                        className={`z-0 w-full h-40 object-cover transition-transform duration-300
                                                            ${!isLocked && "group-hover:scale-110"}`}
                                                    />

                                                    <div
                                                        className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300
                                                            ${
                                                            isSelected
                                                                ? "from-success/30 via-success/10 to-transparent opacity-100"
                                                                : !isLocked
                                                                    ? "from-black/60 to-transparent opacity-0 group-hover:opacity-100"
                                                                    : "from-black/60 to-transparent opacity-100"
                                                        }`}
                                                    />

                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute top-2 right-2 z-10 bg-success rounded-full p-1.5 shadow-lg shadow-success/50"
                                                        >
                                                            <CheckCircle2
                                                                size={18}
                                                                className="text-white"
                                                                strokeWidth={2.5}
                                                            />
                                                        </motion.div>
                                                    )}

                                                    {!isSelected && !isLocked && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                                                                <Gamepad2 size={20} className="text-white" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {isLocked && !isSelected && (
                                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                                            <Lock size={28} className="text-white/40" />
                                                        </div>
                                                    )}
                                                </div>

                                                <CardFooter
                                                    className={`justify-center border-t py-2.5 absolute bottom-0 w-full z-10 transition-all duration-300
                                                        ${
                                                        isSelected
                                                            ? "bg-black/90 backdrop-blur-xl border-success/50"
                                                            : "bg-black/80 backdrop-blur-xl border-white/20"
                                                    }`}
                                                >
                                                    <p className="text-sm font-bold truncate text-white">
                                                        {game.title}
                                                    </p>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-4 bg-white/5 rounded-full">
                                        <Gamepad2 size={32} className="text-white/20" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 font-semibold mb-1">
                                            No games available
                                        </p>
                                        <p className="text-white/30 text-sm">
                                            No games found that everyone owns and supports your party size.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
