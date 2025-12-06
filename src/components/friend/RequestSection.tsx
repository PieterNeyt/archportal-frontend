import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import RequestCard from "@/components/friend/RequestCard.tsx";
import {Profile} from "@/model/profile.ts";

interface RequestSectionProps {
    title: string;
    icon: React.ReactNode;
    emptyIcon: React.ReactNode;
    isLoading: boolean;
    isError: boolean;
    profiles: Profile[];
    type: "incoming" | "outgoing";
}

export default function RequestSection({
                                           title,
                                           icon,
                                           emptyIcon,
                                           isLoading,
                                           isError,
                                           profiles,
                                           type
                                       }: RequestSectionProps) {
    return (
        <>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {isError && (
                <div className="text-center py-20">
                    {emptyIcon}
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friend requests
                    </p>
                </div>
            )}

            {isLoading && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))}
                </div>
            )}

            {!isLoading && !isError && profiles.length === 0 && (
                <div className="text-center py-20">
                    {emptyIcon}
                    <p className="text-white/60 text-xl mb-2">
                        No friend requests found
                    </p>
                </div>
            )}

            {!isLoading && !isError && profiles.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {profiles.map((profile, i) => (
                        <RequestCard key={i} {...profile} type={type}/>
                    ))}
                </div>
            )}
        </>
    )
}