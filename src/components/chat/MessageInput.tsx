import {Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {Send} from "lucide-react";
import {inputClasses} from "@/styles/customClasses.ts";
import {useState} from "react";

interface MessageInputProps {
    onSend: (text: string) => Promise<void> | void;
    isSending?: boolean;
}

export default function MessageInput({onSend, isSending = false}: MessageInputProps) {
    const [text, setText] = useState("");

    const send = async () => {
        if (!text.trim() || isSending) return;
        // call onSend and return its promise; don't swallow errors here
        const result = onSend(text.trim());
        // only clear input if the send promise resolves
        if (result && typeof (result as Promise<void>).then === "function") {
            (result as Promise<void>).then(() => setText(""));
        } else {
            setText("");
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
        }
    };

    return (
        <div className="mt-4 pt-4 border-t flex items-center gap-3">
            <Textarea
                value={text}
                onChange={(e: any) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={"Type a message..."}
                classNames={inputClasses}
                className={"flex-1 resize-none"}
                minRows={1}
                maxRows={6}
                disabled={isSending}
                autoComplete={"off"}
            />
            <Button color={"primary"} onPress={() => void send()} isIconOnly disabled={isSending}>
                <Send/>
            </Button>
        </div>
    );
}