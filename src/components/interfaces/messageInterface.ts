export type Message = {
    id: string;
    sender: string;
    role: string;
    time: string;
    content: string;
    unread?: boolean;
    online?: boolean;
};

export type ChatGroup = {
    id: string;
    name: string;
    role: string;
    messages: Message[];
    icon?: string;
    color?: string;
};