import {useParty} from "@/hooks/useParties.ts";
import NotInParty from "@/components/party/NotInParty.tsx";
import InParty from "@/components/party/InParty.tsx";
import PageError from "@/components/PageError.tsx";
import PartyLoader from "@/components/party/PartyLoader.tsx";

export default function PartyPage() {
    const {party, isError: isErrorParty, isLoading: isLoadingParty, refetch: refetchParty} = useParty();

    const refresh = async () => {
        await refetchParty();
    }

    if (isLoadingParty) {
        return <PartyLoader/>;
    }

    if (isErrorParty) {
        return <PageError title={"Connection lost"} message={"We couldn't sync with the party servers."}
                          refresh={refresh}/>;
    }

    if (!party) {
        return <NotInParty/>;
    }

    return (
        <InParty title={party.title} maxMembers={party.maxMembers} chatRoomId={party.chatRoomId}/>
    );
}
