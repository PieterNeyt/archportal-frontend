import {useNotificationSettings,useAddChannelType,useRemoveChannelType} from "@/hooks/useNotificationSettings.ts";
import {CircularProgress} from "@heroui/progress";
import {Chip} from "@heroui/chip";
import {Select, SelectItem} from "@heroui/react";
import {useState} from "react";
import {ChannelType} from "@/model/notificationSettings.ts";
import {Button} from "@heroui/button";
import {selectClasses} from "@/styles/customClasses.ts";

export function ChangeChannelType() {
    const { isError, isLoading, channelTypes } = useNotificationSettings();
    const [value, setValue] = useState<ChannelType | null>(null);

    const {isPending: AddPending, AddChannelType } = useAddChannelType();
    const {isPending: RemovePending, RemoveChannelType } = useRemoveChannelType();

    const handleAddChannel = async () => {
        if (value) {
            await AddChannelType(value);
            setValue(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-400 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                Error loading notification settings
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-3 items-end">
                <Select
                    className="flex-1 max-w-xs"
                    label="Channel Types"
                    placeholder="Select a channel type"
                    selectedKeys={value ? [value] : []}
                    variant="bordered"
                    classNames={selectClasses}
                    onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as ChannelType;
                        setValue(selected);
                    }}
                >
                    {Object.values(ChannelType)
                        .filter(v => typeof v !== 'number')
                        .map(v => (
                            <SelectItem key={v}>
                                {v}
                            </SelectItem>
                        ))}
                </Select>

                <Button
                    color="primary"
                    variant="shadow"
                    isDisabled={!value || AddPending}
                    isLoading={AddPending}
                    onPress={handleAddChannel}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
                >
                    Add
                </Button>
            </div>

            {channelTypes?.channels && channelTypes.channels.length > 0 ? (
                <div className="space-y-3">
                    <h3 className="text-white/90 font-medium text-sm">Active Channels</h3>
                    <div className="flex flex-wrap gap-2">
                        {channelTypes.channels.map(c => (
                            <Chip
                                key={c}
                                variant="bordered"
                                onClose={() => RemoveChannelType(c)}
                                isDisabled={RemovePending}
                                className="bg-white/5 border-white/20 text-white backdrop-blur-sm"
                            >
                                {c}
                            </Chip>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-white/50 text-sm p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    No active channels. Add one to get started.
                </div>
            )}
        </div>
    );
}