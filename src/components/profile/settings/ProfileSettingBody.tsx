import {User} from "@/model/user";

interface ProfileSettingBodyProps {
    profile: User | undefined;
    activeColor: string | null | undefined;
}

export function ProfileSettingBody({profile, activeColor}: ProfileSettingBodyProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
            <div>
                <span
                    className="text-xs text-white/40 uppercase tracking-widest font-semibold block mb-2">First Name</span>
                <span className="text-lg font-medium tracking-wide">{profile?.firstName}</span>
            </div>
            <div>
                <span
                    className="text-xs text-white/40 uppercase tracking-widest font-semibold block mb-2">Last Name</span>
                <span className="text-lg font-medium tracking-wide">{profile?.lastName}</span>
            </div>
            <div>
                <span
                    className="text-xs text-white/40 uppercase tracking-widest font-semibold block mb-2">Gamer Tag</span>
                <span
                    className="text-lg font-medium tracking-wide"
                    style={activeColor ? {color: activeColor} : {}}
                >
                    @{profile?.gamerTag}
                </span>
            </div>
            <div>
                <span
                    className="text-xs text-white/40 uppercase tracking-widest font-semibold block mb-2">Email Address</span>
                <span className="text-lg font-medium tracking-wide break-all">{profile?.email}</span>
            </div>
        </div>
    )
}