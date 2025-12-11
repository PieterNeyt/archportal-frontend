import { Card, CardBody } from "@heroui/card";
import { Trophy, Target, Clock } from "lucide-react";
import {StatCard} from "@/components/library/game/stats/StatCard.tsx";

export interface GameStatisticsCardProps {
    stats?: {
        totalPlayTimeMinutes: number;
        winnerRecords: { PlayedAt: string; Winner: string }[];
    } | null;
    isLoading: boolean;
}

export function GameStatisticsCard({ stats, isLoading }: GameStatisticsCardProps) {
    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10">
            <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    <Trophy size={24} className="text-purple-400" />
                    Your statistics
                </h3>

                {isLoading ? (
                    <div className="space-y-3 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 bg-white/5 rounded"></div>
                        ))}
                    </div>
                ) : !stats ? (
                    <p className="text-white/60 text-center py-4">
                        No statistics available.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={<Clock size={18} className="text-blue-400" />}
                            label="Playtime"
                            value={`${Math.round(stats.totalPlayTimeMinutes / 60)}u`}
                        />

                        <StatCard
                            icon={<Target size={18} className="text-green-400" />}
                            label="Games Played"
                            value={stats.winnerRecords ? stats.winnerRecords.length : 0}
                        />

                        <StatCard
                            icon={<Trophy size={18} className="text-yellow-400" />}
                            label="Most Recent Winner"
                            value={
                                stats.winnerRecords && stats.winnerRecords.length > 0
                                    ? [...stats.winnerRecords]
                                          .sort(
                                              (a, b) =>
                                                  new Date(b.PlayedAt).getTime() -
                                                  new Date(a.PlayedAt).getTime()
                                          )[0].Winner
                                    : ""
                            }
                        />
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

