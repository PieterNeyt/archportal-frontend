import { TicketPercent, Tag, CheckCircle2 } from "lucide-react";

interface Coupon {
    id: string;
    name: string;
    configuration: string;
}

interface CartCouponsProps {
    userCoupons: Coupon[];
    selectedBenefitId?: string;
    onSelect: (id: string | undefined) => void;
}

export function CartCoupons({ userCoupons, selectedBenefitId, onSelect }: CartCouponsProps) {
    if (userCoupons.length === 0) return null;

    return (
        <div className="pt-6 border-t border-white/10">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Tag size={12} className="text-primary" /> Available coupons
            </h4>
            <div className="space-y-2">
                {userCoupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        onClick={() => onSelect(selectedBenefitId === coupon.id ? undefined : coupon.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedBenefitId === coupon.id
                                ? "border-primary bg-primary/20"
                                : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedBenefitId === coupon.id ? "bg-primary text-black" : "bg-white/10 text-white"}`}>
                                <TicketPercent size={18} />
                            </div>
                            <p className="text-sm font-bold text-white">{coupon.name}</p>
                        </div>
                        {selectedBenefitId === coupon.id && <CheckCircle2 size={18} className="text-primary" />}
                    </div>
                ))}
            </div>
        </div>
    );
}
