import {FormEvent, useEffect, useRef, useState} from "react";
import {SendMessage} from "@/model/chatRoom.ts";
import {Card, CardHeader} from "@heroui/card";
import {Bot, MessageCircle, Send, Sparkles, X} from "lucide-react";
import {Button} from "@heroui/button";
import {CardBody, ScrollShadow} from "@heroui/react";
import {Input} from "@heroui/input";
import {useSendChatbotMessage} from "@/hooks/useChatRooms.ts";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";

export default function FloatingAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<SendMessage[]>([
        {id: "bot", text: "Hey! Need help with your lobby or finding a game?"}
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const {sendMessage, isPending} = useSendChatbotMessage();

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

        setMessages((prev) => [...prev, {id: "user", text: userText}]);

        await sendMessage({id: "", text: userText}, {
            onSuccess: (response) => {
                setMessages((prev) => [...prev, {id: "bot", text: response}]);
            },
            onError: () => {
                setMessages((prev) => [
                    ...prev,
                    {id: "bot", text: "I'm having trouble connecting to the grid. Try again?"}
                ]);
            }
        });
    };

    return (
        <div className={"fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"}>
            {isOpen && (
                <Card
                    className={`w-[350px] h-[500px] shadow-2xl border border-white/10 bg-black/80 backdrop-blur-xl mb-2 animate-in fade-in slide-in-from-bottom-4 ${GLASS_CARD_STYLES}`}>
                    <CardHeader className={"flex justify-between items-center bg-white/5 p-4 border-b border-white/10"}>
                        <div className={"flex items-center gap-2"}>
                            <div className={"p-2 bg-primary/20 rounded-lg text-primary"}>
                                <Bot size={20}/>
                            </div>
                            <div>
                                <p className={"text-sm font-bold text-white"}>Squad Assistant</p>
                                <p className={"text-[10px] text-success flex items-center gap-1"}>
                                    <span className={"w-1.5 h-1.5 bg-success rounded-full animate-pulse"}/>
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button isIconOnly variant={"light"} size={"sm"} onPress={() => setIsOpen(false)}>
                            <X size={18} className={"text-white/50"}/>
                        </Button>
                    </CardHeader>

                    <CardBody className={"p-0 flex flex-col h-full"}>
                        <ScrollShadow ref={scrollRef} className={"flex-1 p-4 space-y-4 overflow-y-auto"}>
                            {messages.map((msg, idx) => (
                                <div key={idx}
                                     className={`flex ${msg.id === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.id === "user"
                                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none"
                                            : "bg-slate-800 text-white rounded-tl-none"
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isPending && (
                                <div className={"flex justify-start"}>
                                    <div className={"bg-white/5 p-3 rounded-2xl rounded-tl-none"}>
                                        <Sparkles size={16} className={"text-primary animate-pulse"}/>
                                    </div>
                                </div>
                            )}
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
                                    classNames={{
                                        inputWrapper: "bg-white/5 border-white/10",
                                        input: "text-white"
                                    }}
                                />
                                <Button
                                    isIconOnly
                                    color={"primary"}
                                    type={"submit"}
                                    isLoading={isPending}
                                >
                                    <Send size={18}/>
                                </Button>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            )}

            <Button
                isIconOnly
                className={`w-14 h-14 rounded-full shadow-2xl transition-all ${
                    isOpen ? "bg-white/10 rotate-90" : "bg-primary"
                }`}
                onPress={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28}/> : <MessageCircle size={28}/>}
            </Button>
        </div>
    );
}