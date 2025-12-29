import {ChangeChannelType} from "@/components/profile/ChangeChannelType.tsx";
import {useProfile} from "@/hooks/useProfile.ts";
import {Button, Card, CardBody, CardHeader, Divider} from "@heroui/react";
import {ProfileSettingHeader} from "@/components/profile/ProfileSettingHeader.tsx";
import {ProfileSettingBody} from "@/components/profile/ProfileSettingBody.tsx";
import {ProfileLoadError} from "@/components/profile/ProfileLoadError.tsx";
import {BLURRY_BACKGROUND} from "@/styles/customClasses.ts";
import {ProfileCardSkeleton} from "@/components/profile/ProfileCardSkeleton.tsx";
import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";
import {ProfileInventory} from "@/components/profile/ProfileInventory.tsx";
import {useInventory} from "@/hooks/useBenefits.ts";


export function ProfileSettingsPage() {
    const { isError, isLoading, profile } = useProfile();
    const { data: myBenefits = [] } = useInventory(profile?.platformBenefits);
    const { updateUser } = useContext(securityContext);

    if (isLoading) {
        return <ProfileCardSkeleton/>
    }

    if (isError || !profile) {
        return <ProfileLoadError/>
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className={BLURRY_BACKGROUND}>
                <CardHeader className="flex justify-between items-start pb-6">
                    <ProfileSettingHeader profile={profile} benefits={myBenefits} />
                    <Button
                        className="bg-white text-black font-semibold shadow-none hover:bg-white/90 border-none"
                        radius="full"
                        onPress={() => updateUser()}
                    >
                        Edit Profile
                    </Button>
                </CardHeader>

                <Divider className="my-2 bg-white/10" />

                <CardBody className="gap-8">
                    <ProfileSettingBody profile={profile} benefits={myBenefits} />

                    <Divider className="bg-white/10" />

                    <ProfileInventory benefits={myBenefits} />

                    <Divider className="bg-white/10" />

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Notification Channels</h3>
                        <ChangeChannelType />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}