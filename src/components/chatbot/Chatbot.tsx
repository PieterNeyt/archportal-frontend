import { FormEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { SendMessage } from "@/model/chatRoom.ts";
import { Card, CardHeader } from "@heroui/card";
import { Bot, MessageCircle, Send, X, GripVertical } from "lucide-react";
import { Button } from "@heroui/button";
import { CardBody, ScrollShadow } from "@heroui/react";
import { Input } from "@heroui/input";
import { useSendChatbotMessage } from "@/hooks/useChatRooms.ts";
import { GLASS_CARD_STYLES } from "@/styles/customClasses.ts";
import { useUIStore } from "@/hooks/useUIStore.ts";
import { useEscapeKey } from "@/hooks/useEscapeKey.ts";

export default function FloatingAssistant() {
    const { isCartOpen } = useUIStore();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<SendMessage[]>([
        { id: "bot", text: "Hey! Need help with your lobby or finding a game?" }
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef(null);
    const { sendMessage, isPending } = useSendChatbotMessage();

    useEscapeKey(() => setIsOpen(false));

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isPending) return;
        const userText = input;
        setInput("");
        setMessages((prev) => [...prev, { id: "user", text: userText }]);

        await sendMessage({ id: "", text: userText }, {
            onSuccess: (response) => {
                setMessages((prev) => [...prev, { id: "bot", text: response }]);
            },
            onError: () => {
                setMessages((prev) => [
                    ...prev,
                    { id: "bot", text: "I'm having trouble connecting to the grid." }
                ]);
            }
        });
    };

    if (isCartOpen) return null;

    return (
        <Draggable
            nodeRef={draggableRef}
            handle=".drag-handle"
            bounds="parent"
        >
            <div
                ref={draggableRef}
                className={"fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"}
                style={{ cursor: 'auto' }}
            >
                {isOpen && (
                    <Card
                        className={`w-[350px] h-[500px] shadow-2xl border border-white/10 bg-black/90 backdrop-blur-xl mb-2 animate-in fade-in zoom-in-95 ${GLASS_CARD_STYLES}`}>
                        <CardHeader
                            className={"drag-handle cursor-move flex justify-between items-center bg-white/5 p-4 border-b border-white/10 active:cursor-grabbing"}>
                            <div className={"flex items-center gap-2 pointer-events-none"}>
                                <div className={"p-2 bg-primary/20 rounded-lg text-primary"}>
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <p className={"text-sm font-bold text-white"}>Arch Portal Assistant</p>
                                    <p className={"text-[10px] text-success flex items-center gap-1"}>
                                        <span className={"w-1.5 h-1.5 bg-success rounded-full animate-pulse"} />
                                        Online (Drag me!)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <GripVertical size={16} className="text-white/20" />
                                <Button isIconOnly variant={"light"} size={"sm"} onPress={() => setIsOpen(false)}>
                                    <X size={18} className={"text-white/50"} />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardBody className={"p-0 flex flex-col h-full"}>
                            <ScrollShadow ref={scrollRef} className={"flex-1 p-4 space-y-4 overflow-y-auto"}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.id === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                            msg.id === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white/10 text-white rounded-tl-none"
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </ScrollShadow>

                            <div className={"p-4 border-t border-white/10 bg-white/5"}>
                                <form onSubmit={handleSendMessage} className={"flex gap-2"}>
                                    <Input
                                        size={"sm"}
                                        variant={"flat"}
                                        placeholder={"Ask away..."}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={isPending}
                                        autoComplete={"off"}
                                        classNames={{ inputWrapper: "bg-white/5 border-white/10", input: "text-white" }}
                                    />
                                    <Button isIconOnly size="sm" color={"primary"} type={"submit"} isLoading={isPending}>
                                        <Send size={16} />
                                    </Button>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                )}
                <div className="drag-handle cursor-move active:cursor-grabbing">
                    <Button
                        isIconOnly
                        className={`w-12 h-12 min-w-12 rounded-full shadow-2xl pointer-events-auto ${
                            isOpen ? "bg-white/10 rotate-90" : "bg-primary"
                        }`}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
                    </Button>
                </div>
            </div>
        </Draggable>
    );
}