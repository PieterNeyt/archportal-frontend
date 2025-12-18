

import { ChevronDown } from "lucide-react";
import { LibraryGame } from "@/model/library";
import { LibraryGameCard } from "./LibraryGameCard";

interface LibrarySectionProps {
    title: string;
    items: LibraryGame[];
    isOpen: boolean;
    toggle: () => void;
    viewMode: 'grid' | 'list';
}

export const LibrarySection = ({
                                   title,
                                   items,
                                   isOpen,
                                   toggle,
                                   viewMode
                               }: LibrarySectionProps) => {
    return (
        <div className="mb-10">
            <div
                className="flex items-center gap-4 mb-6 cursor-pointer group"
                onClick={toggle}
            >
                <span className="text-xs font-bold tracking-[0.2em] text-white/20 uppercase whitespace-nowrap group-hover:text-white/40 transition-colors">
                    {title} ({items.length})
                </span>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90 text-white/20'}`}>
                    <ChevronDown size={20} className="text-white/40 group-hover:text-white" />
                </div>
            </div>

            {isOpen && (
                <div className={viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                    : "flex flex-col gap-4"
                }>
                    {items.map((item) => (
                        <LibraryGameCard key={item.game.id} libraryItem={item} viewMode={viewMode} />
                    ))}
                </div>
            )}
        </div>
    );
};