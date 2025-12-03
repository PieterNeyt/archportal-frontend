import {ChangeChannelType} from "@/components/profile/changeChannelType.tsx";

export function ProfileSettingsPage() {


    return (<div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Change User Settings
                </h1>
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-200 border border-white/30">
                    Placeholder Button
                </button>
            </div>

            <div>
                <ChangeChannelType/>
            </div>
        </div>
    </div>);
}