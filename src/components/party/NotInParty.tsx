import CreatePartyCard from "@/components/party/CreatePartyCard.tsx";
import InviteSkeleton from "@/components/party/InviteSkeleton.tsx";
import PartyInviteCard from "@/components/party/PartyInviteCard.tsx";
import {useGetInvitedParties} from "@/hooks/useParties.ts";
import InviteError from "@/components/party/InviteError.tsx";

export default function NotInParty() {
    const {isLoading, isError, parties, refetch} = useGetInvitedParties();

    const inviteContent = () => {
        if (isLoading)
            return [...Array(2)].map((_, i) => <InviteSkeleton key={i}/>);
        if (isError)
            return <InviteError onRetry={() => refetch()}/>;
        if (!parties || parties.length === 0) {
            return (
                <div
                    className="p-8 border border-dashed border-white/10 rounded-2xl text-center bg-white/5">
                    <p className="text-sm text-white/30">No pending invites at the moment.</p>
                </div>
            );
        }

        return parties.map((party, index) => (
            <PartyInviteCard
                key={index} gamerTag={party.gamerTag} title={party.title}
                maxMembers={party.maxMembers} memberCount={party.memberCount}
            />
        ));
    }

    return (
        <div
            className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 flex flex-col items-center justify-center min-h-screen  p-4">
            <CreatePartyCard/>
            <div className={"space-y-4 w-full"}>
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        Party Invites
                        {parties && parties?.length > 0 && (
                            <span
                                className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                                    {parties ? parties.length : 0}
                                </span>
                        )}
                    </h3>
                </div>

                <div className="flex flex-col gap-3">
                    {inviteContent()}
                </div>
            </div>
        </div>
    );
}