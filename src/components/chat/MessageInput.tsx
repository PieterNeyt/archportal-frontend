import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Send, Smile } from "lucide-react";
import { inputClasses } from "@/styles/customClasses.ts";
import { useSendMessage } from "@/hooks/useChatRooms.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessageSchema, SendMessageValues } from "@/validation/sendMessageValidation.ts";
import { KeyboardEvent, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

interface MessageInputProps {
    chatId: string;
}

export default function MessageInput({ chatId }: MessageInputProps) {
    const { isPending, sendMessage } = useSendMessage();
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { isValid },
    } = useForm<SendMessageValues>({
        resolver: zodResolver(sendMessageSchema),
        defaultValues: {
            text: ""
        },
        mode: "onChange",
    });

    const currentText = watch("text");

    const onSubmit = (data: SendMessageValues) => {
        if (!data.text.trim()) return;

        sendMessage(
            { id: chatId, text: data.text },
            {
                onSuccess: () => {
                    reset();
                    setIsEmojiOpen(false);
                },
            }
        );
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        const newText = (currentText || "") + emojiData.emoji;
        setValue("text", newText, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2"
        >
            <Textarea
                {...register("text")}
                value={currentText}
                placeholder="Type a message..."
                classNames={inputClasses}
                className="flex-1"
                minRows={1}
                maxRows={6}
                isDisabled={isPending}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />

            <div className="flex gap-2 items-center">
                {/* 1. Emoji Button */}
                <Popover
                    placement="top-end"
                    showArrow={true}
                    isOpen={isEmojiOpen}
                    onOpenChange={(open) => setIsEmojiOpen(open)}
                    offset={10}
                >
                    <PopoverTrigger>
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-white/60 hover:text-white rounded-full transition-colors"
                            aria-label="Add emoji"
                        >
                            <Smile size={24} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none">
                        <EmojiPicker
                            theme={Theme.DARK}
                            onEmojiClick={onEmojiClick}
                            lazyLoadEmojis={true}
                            searchDisabled={false}
                            width={300}
                            height={400}
                            previewConfig={{ showPreview: false }}
                        />
                    </PopoverContent>
                </Popover>

                {/* 2. Send Button */}
                <Button
                    type="submit"
                    color="primary"
                    isIconOnly
                    isLoading={isPending}
                    isDisabled={!isValid || isPending}
                    className="rounded-full shadow-lg"
                >
                    {!isPending && <Send size={20} />}
                </Button>
            </div>
        </form>
    );
}