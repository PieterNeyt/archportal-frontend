import {useState} from "react";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import {Gamepad2, Grid3x3, List, Search} from "lucide-react";
import {useLibrary} from "@/hooks/useLibrary";
import {LibraryGameCard} from "@/components/library/LibraryGameCard";
import {LibrarySkeletonCard} from "@/components/library/LibrarySkeletonCard";
import {inputClasses} from "@/styles/customClasses.ts";

export default function LibraryPage() {
    const {isLoading, isError, games} = useLibrary();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredGames = games?.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">
                        My Library
                    </h1>
                    <p className="text-white/60 text-lg">
                        {games?.length || 0} games in your collection
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Search in your library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            startContent={<Search size={20} className="text-white/40"/>}
                            classNames={inputClasses}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div
                            className="ml-4 flex gap-1 p-1 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10">
                            <Button
                                isIconOnly
                                variant={viewMode === 'grid' ? 'solid' : 'light'}
                                color={viewMode === 'grid' ? 'primary' : 'default'}
                                onPress={() => setViewMode('grid')}
                                size="sm"
                            >
                                <Grid3x3 size={18}/>
                            </Button>
                            <Button
                                isIconOnly
                                variant={viewMode === 'list' ? 'solid' : 'light'}
                                color={viewMode === 'list' ? 'primary' : 'default'}
                                onPress={() => setViewMode('list')}
                                size="sm"
                            >
                                <List size={18}/>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="text-center py-20">
                        <Gamepad2 size={64} className="text-white/40 mx-auto mb-4"/>
                        <p className="text-white/60 text-xl">Oops! Something went wrong while loading your library</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                        : "flex flex-col gap-4"
                    }>
                        {[...Array(viewMode === 'grid' ? 10 : 6)].map((_, i) => (
                            <LibrarySkeletonCard key={i} viewMode={viewMode}/>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && filteredGames.length === 0 && (
                    <div className="text-center py-20">
                        <Gamepad2 size={64} className="text-white/40 mx-auto mb-4"/>
                        <p className="text-white/60 text-xl mb-2">
                            {searchQuery ? "Geen games gevonden" : "Je library is nog leeg"}
                        </p>
                        {!searchQuery && (
                            <p className="text-white/40">Visit the shop to add games to your library!</p>
                        )}
                    </div>
                )}

                {/* Games Grid/List */}
                {!isLoading && !isError && filteredGames.length > 0 && (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                        : "flex flex-col gap-4"
                    }>
                        {filteredGames.map((game) => (
                            <LibraryGameCard key={game.id} game={game} viewMode={viewMode}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}