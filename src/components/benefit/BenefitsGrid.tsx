import { BenefitCard } from "@/components/benefit/BenefitCard";
import { SkeletonCard } from "@/components/shop/SkeletonCard";
import { Benefit } from "@/model/benefit";
import { Profile } from "@/model/profile";

interface BenefitsGridProps {
    benefits: Benefit[];
    profile: Profile | undefined;
    userPoints: number;
    isBuying: boolean;
    isLoading: boolean;
    onBuy: (benefit: Benefit) => void;
}

export function BenefitsGrid({
                                 benefits,
                                 profile,
                                 userPoints,
                                 isBuying,
                                 isLoading,
                                 onBuy
                             }: BenefitsGridProps) {
    if (isLoading) {
        return (
            <div className="grid gap-6 justify-items-center"
                 style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {Array(8).fill(0).map((_, index) => <SkeletonCard key={index}/>)}
            </div>
        );
    }

    if (benefits.length === 0) {
        return (
            <div className="grid gap-6 justify-items-center"
                 style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <div className="col-span-full py-20 text-white/50">No benefits found.</div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 justify-items-center"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {benefits.map((benefit) => (
                <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    profile={profile}
                    userPoints={userPoints}
                    isBuying={isBuying}
                    onBuy={onBuy}
                />
            ))}
        </div>
    );
}