import {useAddChannelType, useNotificationSettings, useRemoveChannelType} from "@/hooks/useNotificationSettings.ts";
import {CircularProgress} from "@heroui/progress";
import {Chip} from "@heroui/chip";
import {ChannelType} from "@/model/notificationSettings.ts";
import {cn} from "@heroui/react";
import {useErrorToastEffect} from "@/hooks/useToastEffect.ts";

const CheckIcon = ({className}: { className?: string }) => (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24"
         width="1em" className={className}>
        <path
            d="M18.71 7.21a1 1 0 00-1.42 0l-7.45 7.46-3.13-3.14A1 1 0 105.29 13l3.84 3.84a1 1 0 001.42 0l8.16-8.16a1 1 0 000-1.47z"
            fill="currentColor"/>
    </svg>
);

export function ChangeChannelType() {
    const {isError, isLoading, channelTypes} = useNotificationSettings();
    const {isPending: addPending, error, isError: isErrorAddChannel, AddChannelType} = useAddChannelType();
    const {
        isPending: removePending,
        error: errorRemove,
        isError: isErrorRemove,
        RemoveChannelType
    } = useRemoveChannelType();

    useErrorToastEffect({isError: isErrorAddChannel, error}, "Failed to add channel type",
        "There was an error while updating the channel type.");
    useErrorToastEffect({isError: isErrorRemove, error: errorRemove}, "Failed to add channel type",
        "There was an error while updating the channel type.");

    const allOptions = Object.values(ChannelType).filter(v => typeof v === 'string') as ChannelType[];

    const handleToggle = async (type: ChannelType, isActive: boolean) => {
        if (addPending || removePending) return;

        if (isActive) {
            await RemoveChannelType(type);
        } else {
            await AddChannelType(type);
        }
    };

    if (isLoading) {
        return <div className="flex justify-start p-2">
            <CircularProgress size="sm" color="default" aria-label="Loading..."/>
        </div>;
    }

    if (isError) {
        return <div className="text-danger-400 text-sm bg-danger-500/10 p-2 rounded-lg border border-danger-500/20">
            Failed to load settings.
        </div>;
    }

    const isGlobalPending = addPending || removePending;

    return (
        <div className="flex flex-wrap gap-3">
            {allOptions.map((type) => {
                const isActive = channelTypes?.channels.includes(type) ?? false;

                return (
                    <Chip
                        key={type}
                        variant={isActive ? "solid" : "bordered"}
                        color={isActive ? "success" : "default"}
                        startContent={isActive ? <CheckIcon className="ml-1"/> : undefined}
                        onClick={() => handleToggle(type, isActive)}
                        className={cn(
                            "cursor-pointer transition-all duration-300 select-none border",
                            isActive
                                ? ["bg-success-500/20 border-success-500/50 text-success-400 shadow-[0_0_7px_rgba(74,222,128,0.3)]"]
                                : ["border-white/10 text-white/50 bg-transparent hover:bg-white/5 hover:text-white hover:border-white/30 shadow-none"],
                            isGlobalPending && "opacity-50 cursor-not-allowed"
                        )}
                        isDisabled={isGlobalPending}
                    >
                        {type}
                    </Chip>
                );
            })}
        </div>
    );
}