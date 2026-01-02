import { Button } from "@heroui/react";
import { Check } from "lucide-react";
import { Benefit } from "@/model/benefit";

interface ProfileInventoryItemProps {
    benefit: Benefit;
    preview: React.ReactNode;
    isToggleable?: boolean;
    isActive?: boolean;
    onToggle: (benefitId: string, type: string, config: string, isActive: boolean) => void;
}

export function ProfileInventoryItem({benefit, preview, isToggleable = true, isActive = false, onToggle}: ProfileInventoryItemProps) {
    return (
        <div
            className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                isToggleable
                    ? `cursor-pointer ${isActive ? "bg-primary/20 border-primary" : "bg-white/5 border-white/10"}`
                    : "bg-white/5 border-white/10 cursor-default"
            }`}
            onClick={() => isToggleable && onToggle(benefit.id, benefit.type, benefit.configuration, isActive)}
        >
            <div className="flex items-center gap-3">
                {preview}
                <div>
                    <p className="text-sm font-bold text-white">{benefit.name}</p>
                    <p className="text-[10px] text-white/40 uppercase">
                        {benefit.type.replace("_", " ")}
                    </p>
                </div>
            </div>

            {isToggleable && (
                <Button
                    size="sm"
                    isIconOnly
                    radius="full"
                    variant={isActive ? "solid" : "flat"}
                    color={isActive ? "primary" : "default"}
                    onPress={() => onToggle(benefit.id, benefit.type, benefit.configuration, isActive)}
                >
                    {isActive ? <Check size={16} /> : <Check size={16} className="opacity-20" />}
                </Button>
            )}
        </div>
    );
}
