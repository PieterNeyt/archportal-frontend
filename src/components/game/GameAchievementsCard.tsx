import { Plus, Trophy } from "lucide-react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import { useParams } from "react-router-dom";
import { AchievementModal } from "./AchievementModal";
import { AchievementItem } from "./AchievementItem";
import {useAddAchievement} from "@/hooks/useAchievement.ts";
import {Achievement} from "@/model/game.ts";
import {AchievementFormValues} from "@/validation/AchievementValidation.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";

interface Props {
    achievements?: Achievement[];
}

export function GameAchievementsCard({ achievements = [] }: Props) {
    const { id: gameId } = useParams<{ id: string }>();

    const { AddAchievement, isPending,isError,error,isSuccess } = useAddAchievement(gameId || "");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleAddAchievement = async (data: AchievementFormValues) => {
        await AddAchievement(data);

    };

    useToastEffect({isError,error,isSuccess},"Succesfully created achievement","Failed to create achievement");
    return (
        <>
            <div className="flex items-center justify-between mb-6 z-10">
                <div className="flex items-center gap-3">
                    <Trophy className="text-warning" size={20} />
                    <h2 className="text-xl font-bold text-white">Achievements</h2>
                </div>
                <Button
                    isIconOnly
                    variant="flat"
                    className="bg-white/5 text-white hover:bg-white/10"
                    onPress={onOpen}
                    isLoading={isPending}
                >
                    {!isPending && <Plus size={20} />}
                </Button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                        <AchievementItem key={achievement.id || index} achievement={achievement} />
                    ))
                ) : (
                    <div className="flex-grow flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5 min-h-[120px]">
                        <p className="text-white/40 font-medium text-sm">No achievements yet.</p>
                    </div>
                )}
            </div>

            <AchievementModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleAddAchievement}
            />
        </>
    );
}