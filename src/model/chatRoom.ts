export interface ChatRoom {
    id: string;
    title: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    isYou: boolean;
    text: string;
    timestamp: string;
}