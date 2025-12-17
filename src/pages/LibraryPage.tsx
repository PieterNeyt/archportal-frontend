import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Gamepad2, Grid3x3, List, Search, ChevronDown } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { LibrarySkeletonCard } from "@/components/library/LibrarySkeletonCard";
import { inputClasses } from "@/styles/customClasses.ts";
import { LibraryGame } from "@/model/library";
import { LibraryGameCard } from "@/components/library/LibraryGameCard.tsx";

export default function LibraryPage() {
    const { isLoading, isError, games } = useLibrary();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // States om secties open/dicht te houden
    const [favsOpen, setFavsOpen] = useState(true);
    const [othersOpen, setOthersOpen] = useState(true);

    const filteredItems = games?.filter(item =>
        item.game.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    const LibrarySection = ({
                                title,
                                items,
                                isOpen,
                                toggle
                            }: {
        title: string,
        items: LibraryGame[],
        isOpen: boolean,
        toggle: () => void
    }) => (
        <div className="mb-10">
            {/* De Slick Divider Header */}
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

            {/* Inhoud die inklapt */}
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

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">

                        My Library

                    </h1>
                </div>

                {/* Controls */}
                <div className="mb-10 flex flex-col sm:flex-row gap-6 items-center justify-between">
                    <div className="w-full sm:w-[400px]">
                        <Input
                            placeholder="SEARCH TITLES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            startContent={<Search size={18} className="text-white/20" />}
                            className="bg-white/5"
                            classNames={{
                                ...inputClasses,
                                input: "text-xs font-bold tracking-widest uppercase",
                            }}
                        />
                    </div>

                    <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                        <Button
                            isIconOnly
                            variant="light"
                            className={viewMode === 'grid' ? "text-primary bg-white/5" : "text-white/20"}
                            onPress={() => setViewMode('grid')}
                            size="sm"
                        >
                            <Grid3x3 size={18} />
                        </Button>
                        <Button
                            isIconOnly
                            variant="light"
                            className={viewMode === 'list' ? "text-primary bg-white/5" : "text-white/20"}
                            onPress={() => setViewMode('list')}
                            size="sm"
                        >
                            <List size={18} />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-5 gap-6">
                        {[...Array(5)].map((_, i) => <LibrarySkeletonCard key={i} viewMode={viewMode} />)}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favoriteGames.length > 0 && (
                            <LibrarySection
                                title="Favorites"
                                items={favoriteGames}
                                isOpen={favsOpen}
                                toggle={() => setFavsOpen(!favsOpen)}
                            />
                        )}

                        {otherGames.length > 0 && (
                            <LibrarySection
                                title={favoriteGames.length > 0 ? "All Titles" : "Library"}
                                items={otherGames}
                                isOpen={othersOpen}
                                toggle={() => setOthersOpen(!othersOpen)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}