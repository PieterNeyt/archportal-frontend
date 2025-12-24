import { Card, CardBody } from "@heroui/card";
import { Trophy, Target, Clock, Award } from "lucide-react";
import { StatCard } from "@/components/library/game/stats/StatCard.tsx";
import { useGameStatistics } from "@/hooks/useAnalytics.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";
import { useMemo } from "react";

export interface GameStatisticsCardProps {
    gameId: string;
}

export function GameStatisticsCard({ gameId }: GameStatisticsCardProps) {
    const { gameStatistics, isLoading, isError, isSuccess, error } = useGameStatistics(gameId ?? "");

    useToastEffect({ isSuccess, isError, error }, "", "Failed to load your game statistics");

    const stats = useMemo(() => {
        if (!gameStatistics) return null;

        const hours = Math.floor(gameStatistics.totalPlayTimeMinutes / 60);
        const minutes = gameStatistics.totalPlayTimeMinutes % 60;

        const latestWinner = [...(gameStatistics.winnerRecords || [])]
            .sort((a, b) => new Date(b.PlayedAt).getTime() - new Date(a.PlayedAt).getTime())[0]?.Winner || "N/A";

        return {
            playtime: `${hours}h ${minutes}m`,
            totalGames: gameStatistics.winnerRecords?.length || 0,
            latestWinner: latestWinner,
            achievementCount: gameStatistics.achievements?.length || 0
        };
    }, [gameStatistics]);

    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                    <Trophy size={24} className="text-yellow-500" />
                    Your Statistics
                </h3>

                {isLoading ? (
                    <div className="grid grid-cols-2 gap-4 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                        ))}
                    </div>
                ) : !gameStatistics || !stats ? (
                    <div className="text-center py-8">
                        <p className="text-white/40 italic">No statistics available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={<Clock size={20} className="text-blue-400" />}
                            label="Playtime"
                            value={stats.playtime}
                        />

                        <StatCard
                            icon={<Target size={20} className="text-green-400" />}
                            label="Games Played"
                            value={stats.totalGames}
                        />

                        <StatCard
                            icon={<Award size={20} className="text-purple-400" />}
                            label="Achievements"
                            value={stats.achievementCount}
                        />

                        <StatCard
                            icon={<Trophy size={20} className="text-amber-400" />}
                            label="Recent Winner"
                            value={stats.latestWinner}
                        />
                    </div>
                )}
            </CardBody>
        </Card>
    );
}