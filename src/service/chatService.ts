import {ChatRoom, SendMessage} from "@/model/chatRoom.ts";
import axios from "axios";

export async function getChatRooms(): Promise<ChatRoom[]> {
    const {data: chatRooms} = await axios.get<ChatRoom[]>("/api/chat-room");
    return chatRooms;
}

export async function getChatRoom(id: string): Promise<ChatRoom> {
    const {data: chatRoom} = await axios.get<ChatRoom>(`/api/chat-room/${id}`);
    return chatRoom;
}

export async function sendMessage(message: SendMessage): Promise<void> {
    await axios.post(`/api/chat-room/${message.id}/messages`, {
        text: message.text
    })
}