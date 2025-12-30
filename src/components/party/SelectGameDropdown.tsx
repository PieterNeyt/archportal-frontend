import {AnimatePresence, motion} from "framer-motion";
import {Skeleton} from "@heroui/react";

interface SelectGameDropdownProps {
    isExpanded: boolean;
}

export default function SelectGameDropdown({isExpanded}: SelectGameDropdownProps) {
    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="px-6 py-4 bg-white/5 border-t border-b border-white/5">
                        <p className="text-xs font-semibold text-white/30 uppercase mb-4 tracking-tighter">
                            Select a different game
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="space-y-3 p-3 rounded-xl bg-white/5 border border-white/10"
                                >
                                    <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300"/>
                                    </Skeleton>

                                    <div className="space-y-2">
                                        <Skeleton className="w-3/5 rounded-lg">
                                            <div className="h-3 rounded-lg bg-default-200"/>
                                        </Skeleton>
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-3 rounded-lg bg-default-200"/>
                                        </Skeleton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
