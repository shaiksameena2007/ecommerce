import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: "user" }]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Our agent will be with you shortly! (Mock Chat)", sender: "bot" }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {isOpen ? (
                <div className="bg-white w-80 h-96 shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold flex items-center"><MessageCircle className="mr-2" size={18} /> Support</h3>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-secondary'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="p-4 border-t flex space-x-2">
                        <input
                            type="text"
                            placeholder="Type message..."
                            className="flex-grow border rounded-full px-4 py-2 text-sm outline-none focus:border-primary"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button className="bg-primary text-white p-2 rounded-full"><Send size={18} /></button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300"
                >
                    <MessageCircle size={30} />
                </button>
            )}
        </div>
    );
};

export default ChatBot;
