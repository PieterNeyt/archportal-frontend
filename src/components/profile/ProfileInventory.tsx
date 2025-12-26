import { useBenefits } from "@/hooks/useBenefits";
import { useProfile, useToggleBenefit } from "@/hooks/useProfile";
import { Button } from "@heroui/react";
import {Check, TicketPercent} from "lucide-react";
import {Benefit, BenefitType} from "@/model/benefit";

export function ProfileInventory() {
    const { profile, refetch } = useProfile();
    const { data: allBenefits } = useBenefits();
    const { mutate: toggle } = useToggleBenefit();

    const myBenefits = allBenefits?.filter(b =>
        profile?.platformBenefits.includes(b.id)
    ) || [];

    // Groepeer per type
    const avatars = myBenefits.filter(b => b.type === BenefitType.UNIQUE_PROFILE_PICTURE);
    const colors = myBenefits.filter(b => b.type === BenefitType.USERNAME_COLOR);
    const discounts = myBenefits.filter(b => b.type === BenefitType.GAME_DISCOUNT);

    const handleToggle = (benefitId: string, type: string, config: string, isActive: boolean) => {
        toggle(
            { benefitId, type, config, active: !isActive },
            {
                onSuccess: () => {
                    refetch();
                }
            }
        );
    };

    const renderItem = (
        benefit: Benefit,
        preview: React.ReactNode,
        selectable: boolean = true
    ) => {
        const isActive =
            profile?.activeProfilePictureId === benefit.id ||
            profile?.activeUsernameColorId === benefit.id;

        return (
            <div
                key={benefit.id}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isActive
                        ? "bg-primary/20 border-primary"
                        : "bg-white/5 border-white/10"
                }`}
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

                {selectable && (
                    <Button
                        size="sm"
                        isIconOnly
                        radius="full"
                        variant={isActive ? "solid" : "flat"}
                        color={isActive ? "primary" : "default"}
                        onPress={() =>
                            handleToggle(
                                benefit.id,
                                benefit.type,
                                benefit.configuration,
                                isActive
                            )
                        }
                    >
                        {isActive ? (
                            <Check size={16} />
                        ) : (
                            <Check size={16} className="opacity-20" />
                        )}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">My inventory</h3>

            {/* Avatars */}
            {avatars.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Avatars</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {avatars.map(b =>
                            renderItem(
                                b,
                                <img
                                    src={b.configuration}
                                    alt={b.name}
                                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Username kleuren */}
            {colors.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Username colours</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {colors.map(b =>
                            renderItem(
                                b,
                                <div
                                    className="w-8 h-8 rounded-full border border-white/30"
                                    style={{ backgroundColor: b.configuration }}
                                    title={b.configuration}
                                />
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Game vouchers */}
            {discounts.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Game vouchers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {discounts.map(b =>
                            renderItem(
                                b,
                                <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center border border-secondary/40">
                                    <TicketPercent size={25} className="text-white" />
                                </div>,
                                false
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
