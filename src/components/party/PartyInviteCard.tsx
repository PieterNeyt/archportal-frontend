import {User} from "@heroui/user";
import {Check, Users, X} from "lucide-react";
import {Button} from "@heroui/button";

interface PartyInviteCardProps {
    gamerTag: string;
    title: string;
    maxMembers: number;
    memberCount: number;
}

export default function PartyInviteCard({gamerTag, title, maxMembers, memberCount}: PartyInviteCardProps) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10">
            <div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/10 blur-3xl transition-opacity group-hover:opacity-100"/>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-3">
                    <User
                        name={gamerTag}
                        description="Invited you to play"
                        avatarProps={{
                            name: gamerTag,
                            className: "bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg",
                        }}
                        classNames={{
                            name: "text-white font-bold",
                            description: "text-white/50 text-xs",
                        }}
                    />

                    <div className="mt-1 flex flex-col gap-1">
                        <h3 className="text-lg font-semibold tracking-tight text-white leading-tight">
                            {title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-white/40">
                            <Users size={14} className="text-blue-400"/>
                            <span>{memberCount} / {maxMembers} Members</span>

                            <div className="ml-2 h-1 w-12 overflow-hidden rounded-full bg-white/10">
                                <div
                                    className="h-full bg-blue-400"
                                    style={{width: `${(memberCount / maxMembers) * 100}%`}}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:flex-row">
                    <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        radius="lg"
                        className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        onPress={() => console.log("declined")}
                        aria-label="Decline Invite"
                    >
                        <X size={20} strokeWidth={2.5}/>
                    </Button>

                    <Button
                        variant="shadow"
                        color="success"
                        radius="lg"
                        className="flex-1 font-bold text-white shadow-success/20 sm:flex-none sm:px-6"
                        startContent={<Check size={18} strokeWidth={3}/>}
                        onPress={() => console.log("accepted")}
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    );
}