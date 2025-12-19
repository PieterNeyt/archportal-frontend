import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Grid3x3, List, Search, AlertCircle, RefreshCw } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { LibrarySkeletonCard } from "@/components/library/LibrarySkeletonCard";
import { inputClasses } from "@/styles/customClasses.ts";
import { LibrarySection } from "@/components/library/LibrarySection";

export default function LibraryPage() {
    const { isLoading, isError, games } = useLibrary();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [favsOpen, setFavsOpen] = useState(true);
    const [othersOpen, setOthersOpen] = useState(true);

    const filteredItems = games?.filter(item => {
        if (!item || !item.game) return false;
        const title = item.game.title || "";

        return title.toLowerCase().includes(searchQuery.toLowerCase());
    }) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">
                        My Library
                    </h1>
                </div>

                {!isError && (
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
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => <LibrarySkeletonCard key={i} viewMode={viewMode} />)}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="bg-danger/10 p-6 rounded-full mb-6">
                            <AlertCircle size={48} className="text-danger" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Couldn't load your library</h2>
                        <p className="text-white/50 max-w-md mb-8">
                            Something went wrong while fetching your games.
                        </p>
                        <Button
                            color="primary"
                            variant="flat"
                            startContent={<RefreshCw size={18} />}
                            onPress={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favoriteGames.length > 0 && (
                            <LibrarySection
                                title="Favorites"
                                items={favoriteGames}
                                isOpen={favsOpen}
                                toggle={() => setFavsOpen(!favsOpen)}
                                viewMode={viewMode}
                            />
                        )}

                        {otherGames.length > 0 && (
                            <LibrarySection
                                title={favoriteGames.length > 0 ? "All Titles" : "Library"}
                                items={otherGames}
                                isOpen={othersOpen}
                                toggle={() => setOthersOpen(!othersOpen)}
                                viewMode={viewMode}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}