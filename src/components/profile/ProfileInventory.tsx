import { useToggleBenefit} from "@/hooks/useProfile";
import {BenefitType} from "@/model/benefit";
import {useInventory} from "@/hooks/useBenefits";
import {ProfileInventoryItem} from "./ProfileInventoryItem";
import {TicketPercent} from "lucide-react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useContext} from "react";


export function ProfileInventory() {

    const { loggedInUser, refetchProfile } = useContext(SecurityContext);
    const {data: myBenefits = []} = useInventory(loggedInUser?.platformBenefits);

    const {mutate: toggle} = useToggleBenefit();

    const avatars = myBenefits.filter(b => b.type === BenefitType.UNIQUE_PROFILE_PICTURE);
    const colors = myBenefits.filter(b => b.type === BenefitType.USERNAME_COLOR);
    const discounts = myBenefits.filter(b => b.type === BenefitType.GAME_DISCOUNT);

    const handleToggle = (benefitId: string) => {
        toggle({benefitId}, {
            onSuccess: async () => {
                await refetchProfile();
            }
        });
    };

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">My inventory</h3>

            {/* Avatars */}
            {avatars.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Avatars</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {avatars.map(b => (
                            <ProfileInventoryItem
                                key={b.id}
                                benefit={b}
                                preview={
                                    <img
                                        src={b.configuration}
                                        alt={b.name}
                                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                                    />
                                }
                                isActive={loggedInUser?.activeProfilePictureId === b.id}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Username kleuren */}
            {colors.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Username colours</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {colors.map(b => (
                            <ProfileInventoryItem
                                key={b.id}
                                benefit={b}
                                preview={
                                    <div
                                        className="w-8 h-8 rounded-full border border-white/30"
                                        style={{backgroundColor: b.configuration}}
                                        title={b.configuration}
                                    />
                                }
                                isActive={loggedInUser?.activeUsernameColorId === b.id}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Game vouchers */}
            {discounts.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white/70">Game vouchers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {discounts.map(b => (
                            <ProfileInventoryItem
                                key={b.id}
                                benefit={b}
                                preview={
                                    <div
                                        className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center border border-secondary/40">
                                        <TicketPercent size={25} className="text-white"/>
                                    </div>
                                }
                                isToggleable={false}
                                onToggle={handleToggle}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
