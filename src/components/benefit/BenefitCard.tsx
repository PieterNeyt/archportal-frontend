import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {Chip} from "@heroui/chip";
import {Benefit, BenefitType} from "@/model/benefit";
import {Profile} from "@/model/profile";
import {ShoppingCart, CheckCircle2} from "lucide-react";

interface Props {
    benefit: Benefit;
    profile: Profile | undefined;
    userPoints: number;
    onBuy: (benefit: Benefit) => void;
    isBuying: boolean;
}

export function BenefitCard({ benefit, profile, userPoints, onBuy, isBuying }: Props) {
    // Check of de gebruiker dit voordeel al bezit
    const isOwned = profile?.platformBenefits?.includes(benefit.id);
    const canAfford = userPoints >= benefit.pointCost;

    const renderPreview = () => {
        if (!profile) return <div className="w-full h-full bg-white/5 animate-pulse" />;

        switch (benefit.type) {
            case BenefitType.USERNAME_COLOR:
                return (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <span className="text-xs text-white/40 uppercase font-bold">Preview</span>
                        <span className="text-6xl font-bold" style={{ color: benefit.configuration }}>
                            {profile.gamerTag}
                        </span>
                    </div>
                );
            case BenefitType.UNIQUE_PROFILE_PICTURE:
                return (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <span className="text-xs text-white/40 uppercase font-bold">Preview</span>
                        <Avatar src={benefit.configuration} className="w-24 h-24 border-2 border-white/10 shadow-lg shadow-primary/20" />
                    </div>
                );
            case BenefitType.GAME_DISCOUNT:
                return (
                    <div className="flex flex-col items-center justify-center h-full gap-1">
                        <span className="text-xs text-white/40 uppercase font-bold">Discount</span>
                        <span className="text-6xl font-black text-primary drop-shadow-[0_0_20px_rgba(0,111,238,0.3)]">
                            -{benefit.configuration}
                        </span>
                    </div>
                );
            default:
                return <div className="w-full h-full bg-white/5" />;
        }
    };

    return (
        <Card className={`py-0 w-[250px] h-[380px] sm:w-[300px] bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 ${isOwned ? 'opacity-90' : ''}`}>
            <CardBody className="p-0 overflow-hidden bg-white/5 flex items-center justify-center relative">
                {renderPreview()}

                {/* 'Owned' badge */}
                {isOwned && (
                    <div className="absolute top-3 right-3">
                        <Chip
                            color="success"
                            variant="flat"
                            startContent={<CheckCircle2 size={14} />}
                            className="backdrop-blur-md border border-success/20"
                        >
                            Owned
                        </Chip>
                    </div>
                )}
            </CardBody>

            <CardHeader className="pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large truncate w-full">{benefit.name}</h4>


                <p className={`text-xl font-bold ${isOwned ? 'text-success' : 'text-primary'}`}>
                    {isOwned ? "Unlocked" : `${benefit.pointCost} Points`}
                </p>

                <p className="text-tiny text-white/50 line-clamp-1">{benefit.description}</p>
            </CardHeader>

            <CardFooter className="pt-0 px-4 pb-4 mt-auto">
                <Button
                    color={isOwned ? "success" : (canAfford ? "primary" : "default")}
                    variant={isOwned ? "flat" : "solid"}
                    className="w-full font-bold"
                    isDisabled={isOwned || !canAfford || isBuying}
                    isLoading={isBuying}
                    startContent={!isBuying && !isOwned && <ShoppingCart size={18}/>}
                    onPress={() => onBuy(benefit)}
                >
                    {isOwned ? "Already Owned" : (canAfford ? "Buy Benefit" : "Insufficient Points")}
                </Button>
            </CardFooter>
        </Card>
    );
}