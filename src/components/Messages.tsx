import React from 'react';
import { Search, Paperclip, Send, MoreVertical, Link2, Image, Video } from 'lucide-react';

type Message = {
  id: string;
  sender: string;
  role: string;
  time: string;
  content: string;
  unread?: boolean;
  online?: boolean;
};

type ChatGroup = {
  id: string;
  name: string;
  role: string;
  messages: Message[];
  icon?: string;
  color?: string;
};

const chatGroups: ChatGroup[] = [
  {
    id: '1',
    name: 'Sonia Reagan',
    role: 'Customer',
    messages: [
      {
        id: '1',
        sender: 'Sonia Reagan',
        role: 'Customer',
        time: '1:05 PM',
        content: 'What are the COVID-19 requirements for my flight from Sydney to Singapore?',
        online: true
      }
    ]
  },
  {
    id: '2',
    name: 'Admin Team',
    role: 'Team',
    messages: [
      {
        id: '2',
        sender: 'Admin Team',
        role: 'Team',
        time: '1:15 PM',
        content: 'Reminder: Update the flight schedule for...',
        unread: true
      }
    ],
    color: 'bg-amber-500'
  },
  {
    id: '3',
    name: 'IT Support',
    role: 'Team',
    messages: [
      {
        id: '3',
        sender: 'IT Support',
        role: 'Team',
        time: '1:30 PM',
        content: 'System maintenance will be next...',
        unread: true
      }
    ],
    color: 'bg-indigo-500'
  },
  {
    id: '4',
    name: 'Marketing Team',
    role: 'Team',
    messages: [
      {
        id: '4',
        sender: 'Marketing Team',
        role: 'Team',
        time: '2:00 PM',
        content: 'Please review the new promotional...',
        unread: true
      }
    ],
    color: 'bg-pink-500'
  }
];

const ChatSidebar = ({ selectedChat, onSelectChat }: { selectedChat: string, onSelectChat: (id: string) => void }) => (
  <div className="w-80 border-r bg-white">
    <div className="p-4">
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search name, chat, etc"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
    </div>

    <div className="overflow-y-auto h-[calc(100vh-8rem)]">
      {chatGroups.map((group) => (
        <div
          key={group.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            selectedChat === group.id ? 'bg-gray-50' : ''
          }`}
          onClick={() => onSelectChat(group.id)}
        >
          <div className="flex items-center space-x-3">
            {group.icon ? (
              <img src={group.icon} alt={group.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className={`w-10 h-10 rounded-full ${group.color || 'bg-gray-200'} flex items-center justify-center text-white font-medium`}>
                {group.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{group.name}</h3>
                <span className="text-sm text-gray-500">{group.messages[0].time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 truncate">{group.messages[0].content}</p>
                {group.messages[0].unread && (
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatMain = ({ selectedChat }: { selectedChat: string }) => {
  const chat = chatGroups.find((g) => g.id === selectedChat);
  
  if (!chat) return null;

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {chat.icon ? (
            <img src={chat.icon} alt={chat.name} className="w-10 h-10 rounded-full" />
          ) : (
            <div className={`w-10 h-10 rounded-full ${chat.color || 'bg-gray-200'} flex items-center justify-center text-white font-medium`}>
              {chat.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="font-medium">{chat.name}</h2>
            <p className="text-sm text-gray-500">{chat.role}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Chat messages would go here */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full ${chat.color || 'bg-gray-200'} flex items-center justify-center text-white font-medium`}>
              {chat.name.charAt(0)}
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
              <p>{chat.messages[0].content}</p>
              <span className="text-xs text-gray-500 mt-1">{chat.messages[0].time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full pl-4 pr-20 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Link2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <button className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatInfo = () => (
  <div className="w-80 border-l bg-white p-4">
    <div className="text-center mb-6">
      <h3 className="font-medium">Profile</h3>
    </div>

    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
        <h4 className="font-medium">Sonia Reagan</h4>
        <p className="text-sm text-gray-500">Customer</p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Files</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded">
                <Image className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-sm">Passport.pdf</span>
            </div>
            <span className="text-xs text-gray-500">2.3 MB</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded">
                <Video className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-sm">Boarding.mp4</span>
            </div>
            <span className="text-xs text-gray-500">12 MB</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Messages() {
  const [selectedChat, setSelectedChat] = React.useState(chatGroups[0].id);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <ChatMain selectedChat={selectedChat} />
      <ChatInfo />
    </div>
  );
}