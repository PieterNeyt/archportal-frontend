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

export interface SendMessage {
    id: string;
    text: string;
}


export interface LastMessage {
    text: string;
    timestamp: Date;
}

