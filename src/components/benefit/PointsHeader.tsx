import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Search, Trophy } from "lucide-react";

interface PointsHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    points: number;
}

export function PointsHeader({ searchQuery, onSearchChange, points }: PointsHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div className="flex flex-1 flex-wrap gap-4 w-full max-w-4xl items-center">
                <Input
                    className="w-full sm:w-auto sm:flex-1 min-w-[200px]"
                    placeholder="Search for benefits..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    startContent={<Search size={20} className="text-white/40"/>}
                    classNames={{
                        input: "bg-transparent text-white",
                        inputWrapper: "bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                    }}
                    isClearable
                />
            </div>

            <div className="flex-none self-end sm:self-center">
                <Chip
                    variant="flat"
                    color="warning"
                    className="h-10 px-4 border border-warning/20 bg-warning/10"
                    startContent={<Trophy size={18} className="text-warning" />}
                >
                    <span className="font-mono font-bold text-lg ml-1">
                        {points.toLocaleString()} <span className="text-xs opacity-50 uppercase ml-1">pts</span>
                    </span>
                </Chip>
            </div>
        </div>
    );
}