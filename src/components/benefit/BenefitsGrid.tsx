import {BenefitCard} from "@/components/benefit/BenefitCard";
import {SkeletonCard} from "@/components/shop/SkeletonCard";
import {Benefit} from "@/model/benefit";
import {useProfileBenefits} from "@/hooks/useBenefits.ts";

interface BenefitsGridProps {
    benefits: Benefit[];
    userPoints: number;
    isBuying: boolean;
    isLoading: boolean;
    onBuy: (benefit: Benefit) => void;
}

export function BenefitsGrid({benefits, userPoints, isBuying, isLoading, onBuy}: BenefitsGridProps) {
    const {isLoading: isLoadingBenefit, data: profileBenefits} = useProfileBenefits();

    if (isLoading || isLoadingBenefit) {
        return (
            <div className="grid gap-6 justify-items-center"
                 style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
                {Array(8).fill(0).map((_, index) => <SkeletonCard key={index}/>)}
            </div>
        );
    }

    if (benefits.length === 0) {
        return (
            <div className="grid gap-6 justify-items-center"
                 style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
                <div className="col-span-full py-20 text-white/50">No benefits found.</div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 justify-items-center"
             style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'}}>
            {benefits.map((benefit) => (
                <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    profileBenefits={profileBenefits}
                    userPoints={userPoints}
                    isBuying={isBuying}
                    onBuy={onBuy}
                />
            ))}
        </div>
    );
}