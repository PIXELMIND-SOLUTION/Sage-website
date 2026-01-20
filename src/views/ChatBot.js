// components/ChatBot.jsx
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Tooltip */}
        <div
          className="
            absolute right-16 bottom-1/2 translate-y-1/2
            px-4 py-2 rounded-lg
            bg-indigo-600 text-white text-sm font-medium
            shadow-lg whitespace-nowrap
            opacity-0 translate-x-2
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300
            pointer-events-none
          "
        >
          Hi 👋 How can I assist you?
        </div>

        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="
            w-14 h-14 rounded-full
            bg-gradient-to-r from-indigo-600 to-violet-600
            text-white shadow-xl
            flex items-center justify-center
            hover:scale-110 transition-all duration-300
          "
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="bg-white w-full sm:w-[380px] h-[75vh] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
              <h3 className="font-semibold">Chat with us</h3>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 text-gray-600 text-sm">
              👋 Hi! How can we help you today?
              {/* Integrate your chatbot / iframe here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
