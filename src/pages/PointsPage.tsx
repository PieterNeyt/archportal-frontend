import {useBenefits, useBuyBenefit, usePoints} from "@/hooks/useBenefits.ts";
import {useMemo, useState} from "react";
import {useDisclosure} from "@heroui/modal";
import useToastEffect from "@/hooks/useToastEffect.ts";
import {Benefit} from "@/model/benefit";
import {PointsHeader} from "@/components/benefit/PointsHeader";
import {BenefitsGrid} from "@/components/benefit/BenefitsGrid";
import {PurchaseConfirmationModal} from "@/components/benefit/PurchaseConfirmationModal";

export default function PointsPage() {
    const {data: benefits, isLoading: benefitsLoading} = useBenefits();
    const {data: points, isLoading: pointsLoading} = usePoints();
    const {mutate: buyBenefit, isPending: isBuying, ...buyMutation} = useBuyBenefit();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    useToastEffect(
        buyMutation,
        "Benefit unlocked",
        "Failed to purchase",
        "Successfully added benefit to your profile"
    );

    const handlePurchaseClick = (benefit: Benefit) => {
        setSelectedBenefit(benefit);
        onOpen();
    };

    const confirmPurchase = () => {
        if (selectedBenefit) {
            buyBenefit(selectedBenefit.id, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    const filteredBenefits = useMemo(() => {
        if (!benefits) return [];
        return benefits.filter(b =>
            b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [benefits, searchQuery]);

    const isLoading = benefitsLoading || pointsLoading;

    return (
        <div className="p-4 sm:p-8">
            <PointsHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                points={points ?? 0}
            />

            <BenefitsGrid
                benefits={filteredBenefits}
                userPoints={points ?? 0}
                isBuying={isBuying}
                isLoading={isLoading}
                onBuy={handlePurchaseClick}
            />

            <PurchaseConfirmationModal
                isOpen={isOpen}
                onClose={onClose}
                benefit={selectedBenefit}
                userPoints={points ?? 0}
                onConfirm={confirmPurchase}
            />
        </div>
    );
}

