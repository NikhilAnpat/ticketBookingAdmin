import React, { useState, useRef } from 'react';
import { Search, Paperclip, Send, MoreVertical, Link2, Image, Video, ArrowLeft, User, X } from 'lucide-react';
import {ChatGroup} from '../components/interfaces/messageinterface'





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

const ChatSidebar = ({ selectedChat, onSelectChat, isMobile }: { selectedChat: string, onSelectChat: (id: string) => void, isMobile: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chatGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.messages[0].content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${isMobile ? 'w-full' : 'w-[320px] min-w-[320px]'} border-r bg-white flex flex-col h-full`}>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, chat, etc"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {(searchQuery ? filteredChats : chatGroups).map((group) => (
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{group.name}</h3>
                  <span className="text-sm text-gray-500 ml-2 flex-shrink-0">{group.messages[0].time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 truncate">{group.messages[0].content}</p>
                  {group.messages[0].unread && (
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 ml-2"></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {searchQuery && filteredChats.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <p>No results found</p>
            <p className="text-sm">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatMain = ({ selectedChat, onBack, onShowProfile, isMobile }: { selectedChat: string, onBack: () => void, onShowProfile: () => void, isMobile: boolean }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chat = chatGroups.find((g) => g.id === selectedChat);
  
  if (!chat) return null;

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFiles.length > 0) {
      const newMsg = {
        id: Date.now().toString(),
        sender: 'Admin',
        role: 'Admin',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: newMessage,
        files: selectedFiles
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setSelectedFiles([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isMobile && (
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
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
        <div className="flex items-center space-x-2">
          {isMobile && (
            <button onClick={onShowProfile} className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
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

          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3 justify-end">
              <div className="bg-amber-500 text-white p-3 rounded-lg shadow-sm max-w-md">
                <p>{msg.content}</p>
                {msg.files && msg.files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.files.map((file: File, index: number) => (
                      <div key={index} className="flex items-center bg-amber-600 rounded p-2">
                        {file.type.includes('image') ? (
                          <Image className="w-4 h-4 mr-2" />
                        ) : (
                          <Paperclip className="w-4 h-4 mr-2" />
                        )}
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs text-amber-100 mt-1 block">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="bg-white border-t p-2">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded-full pl-3 pr-2 py-1">
                {file.type.includes('image') ? (
                  <Image className="w-4 h-4 mr-2" />
                ) : (
                  <Paperclip className="w-4 h-4 mr-2" />
                )}
                <span className="text-sm truncate max-w-[100px]">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 hover:bg-gray-200 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full pl-4 pr-20 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Link2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <button 
            onClick={handleSendMessage}
            className={`p-2 rounded-lg ${
              newMessage.trim() || selectedFiles.length > 0
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatInfo = ({ onBack, isMobile, selectedChat }: { onBack?: () => void, isMobile?: boolean, selectedChat: string }) => {
  const selectedUser = chatGroups.find(group => group.id === selectedChat);

  if (!selectedUser) return null;

  return (
    <div className={`${isMobile ? 'w-full' : 'w-[320px] min-w-[320px]'} bg-white h-full flex flex-col`}>
      <div className="p-4 border-b flex items-center justify-between">
        {onBack && (
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        )}
        <h3 className="font-medium flex-1 text-center">Profile</h3>
        <div className="w-7" /> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="text-center">
            {selectedUser.icon ? (
              <img src={selectedUser.icon} alt={selectedUser.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            ) : (
              <div className={`w-24 h-24 rounded-full ${selectedUser.color || 'bg-gray-200'} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-medium`}>
                {selectedUser.name.charAt(0)}
              </div>
            )}
            <h4 className="font-medium text-lg">{selectedUser.name}</h4>
            <p className="text-sm text-gray-500">{selectedUser.role}</p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Files</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded">
                    <Image className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-sm">Passport.pdf</span>
                </div>
                <span className="text-xs text-gray-500">2.3 MB</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded">
                    <Video className="w-5 h-5 text-gray-500" />
                  </div>
                  <span className="text-sm">Boarding.mp4</span>
                </div>
                <span className="text-xs text-gray-500">12 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Messages() {
  const [selectedChat, setSelectedChat] = React.useState(chatGroups[0].id);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileView, setMobileView] = useState<'list' | 'chat' | 'profile'>('list');

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileView('list');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChatSelect = (id: string) => {
    setSelectedChat(id);
    if (isMobile) {
      setMobileView('chat');
    }
  };

  const handleBack = () => {
    setMobileView('list');
  };

  const handleShowProfile = () => {
    setMobileView('profile');
  };

  if (isMobile) {
    switch (mobileView) {
      case 'list':
        return <ChatSidebar selectedChat={selectedChat} onSelectChat={handleChatSelect} isMobile={true} />;
      case 'chat':
        return <ChatMain selectedChat={selectedChat} onBack={handleBack} onShowProfile={handleShowProfile} isMobile={true} />;
      case 'profile':
        return <ChatInfo onBack={handleBack} isMobile={true} selectedChat={selectedChat} />;
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} isMobile={false} />
      <ChatMain selectedChat={selectedChat} onBack={handleBack} onShowProfile={handleShowProfile} isMobile={false} />
      <ChatInfo isMobile={false} selectedChat={selectedChat} />
    </div>
  );
}