import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Send} from "lucide-react";
import {inputClasses} from "@/styles/customClasses.ts";
import {KeyboardEvent, useState} from "react";

interface MessageInputProps {
    onSend: (text: string) => Promise<void> | void;
    isSending?: boolean;
}

export default function MessageInput({onSend, isSending = false}: MessageInputProps) {
    const [text, setText] = useState("");

    const send = async () => {
        if (!text.trim() || isSending) return;
        try {
            await onSend(text.trim());
            setText("");
        } catch (e) {
            // caller handles errors
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
        }
    };

    return (
        <div className="mt-4 pt-4 border-t flex items-center gap-3">
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={"Type a message..."}
                classNames={inputClasses}
                className={"flex-1"}
                disabled={isSending}
            />
            <Button color={"primary"} onPress={() => void send()} isIconOnly disabled={isSending}>
                <Send/>
            </Button>
        </div>
    );
}