import {Input} from "@heroui/input";
import {Gamepad2, Search} from "lucide-react";
import {useState} from "react";
import {useFriends} from "@/hooks/useFriends.ts";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import FriendCard from "@/components/friend/FriendCard.tsx";
import AddFriendModal from "@/components/friend/AddFriendModal.tsx";

export default function FriendsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const {isLoading, isError, profiles} = useFriends();

    const filteredProfiles = profiles?.filter(profile =>
        profile.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className={"max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"}>
            <div className="flex items-center gap-4 mb-8">
                <Input
                    placeholder="Search for a friend..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search size={20} className="text-white/40"/>}
                    classNames={{
                        input: "bg-transparent text-white",
                        inputWrapper: "h-11 bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                    }}
                />

                <AddFriendModal/>
            </div>
            <h2 className={"text-xl font-bold text-foreground mb-4"}>
                Your friends
            </h2>

            {isError && (
                <div className="text-center py-20">
                    <Gamepad2 size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friends list</p>
                </div>
            )}

            {isLoading && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))}
                </div>
            )}

            {!isLoading && !isError && filteredProfiles.length === 0 && (
                <div className="text-center py-20">
                    <Gamepad2 size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        {searchQuery ? "No friends found" : "Your friends list is empty"}
                    </p>
                    {!searchQuery && (
                        <p className="text-white/40">Add some friends to your friends list!</p>
                    )}
                </div>
            )}

            {!isLoading && !isError && filteredProfiles.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {filteredProfiles.map((profile, i) => (
                        <FriendCard key={i} {...profile}/>
                    ))}
                </div>
            )}

        </div>
    );
}