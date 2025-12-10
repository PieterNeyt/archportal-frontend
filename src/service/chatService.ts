import {ChatRoom, LastMessage, SendMessage} from "@/model/chatRoom.ts";
import axios from "axios";

export async function getChatRooms(): Promise<ChatRoom[]> {
    const {data: chatRooms} = await axios.get<ChatRoom[]>("/api/chat-room");
    return chatRooms;
}

export async function getChatRoomLastMessage(id:string): Promise<LastMessage> {
    const {data: lastMessage} = await axios.get<LastMessage>(`/api/chat-room/last-message/${id}`);
    return lastMessage;
}

export async function getChatRoom(id: string): Promise<ChatRoom> {
    const {data: chatRoom} = await axios.get<ChatRoom>(`/api/chat-room/${id}`);
    return chatRoom;
}

export async function sendMessage(message: SendMessage): Promise<void> {
    console.log("message: ", message);
    await axios.post(`/api/chat-room/${message.id}/messages`, {
        text: message.text
    })
}