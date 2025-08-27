import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import ChatSendMessage from "./ChatSendMessage";
import MessagesSkeleton from "./MessagesSkeleton";
import { CheckCheck, CircleSlash } from "lucide-react";
import { useRef } from "react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToNewMessages,
    stopListeningToNewMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const chatEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    listenToNewMessages();

    return () => stopListeningToNewMessages();
  }, [
    getMessages,
    selectedUser._id,
    listenToNewMessages,
    stopListeningToNewMessages,
  ]);

  useEffect(() => {
    if (chatEndRef.current && messages) {
      chatEndRef.current.scrollIntoView();
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-y-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <ChatSendMessage />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto font-inter">
      <ChatHeader />
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-1 text-center">
            <h2 className="text-xl font-bold">No messages yet.</h2>
            <p className="text-sm opacity-70">Start a conversation, say Hi!</p>
          </div>
        ) : (
          messages.map((message) => (
            // Individual message
            <div
              key={message._id}
              className={`chat space-y-0.5 ${
                message.senderID === selectedUser._id
                  ? "chat-start"
                  : "chat-end"
              }`}
              ref={chatEndRef}
            >
              <div className="chat-image">
                {message.senderID === selectedUser._id ? (
                  <div className="avatar size-10">
                    <div className="relative mx-auto lg:mx-0 p-[1px]">
                      {selectedUser.profilePic ? (
                        <img
                          src={selectedUser.profilePic}
                          alt={`Image of ${selectedUser.name}`}
                          className="rounded-full size-full object-cover"
                        />
                      ) : (
                        <div className="bg-primary size-full rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-base-100">
                            {selectedUser.name
                              .split(" ")
                              .map((word) => word[0].toUpperCase())}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="avatar size-10">
                    <div className="relative mx-auto lg:mx-0 p-[1px]">
                      {authUser.profilePic ? (
                        <img
                          src={authUser.profilePic}
                          alt={`Image of ${authUser.name}`}
                          className="rounded-full size-full object-cover"
                        />
                      ) : (
                        <div className="bg-primary size-full rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-base-100">
                            {authUser.name
                              .split(" ")
                              .map((word) => word[0].toUpperCase())}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50 font-roboto">
                  {new Date(message.createdAt).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </time>
              </div>
              <div
                className={`chat-bubble md:max-w-[75%] bg-base-100 space-y-1 ${
                  message.image && !message.text
                    ? "bg-transparent px-0 py-0"
                    : "px-2"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt={message.text}
                    className="max-w-[200px] xs:max-w-3xs sm:max-w-xs md:max-w-sm object-cover rounded-lg border border-base-100"
                  />
                )}
                <p className="text-sm md:text-base">{message.text}</p>
              </div>
              <div className="chat-footer text-sm font-roboto">
                {messages.includes(message) ? (
                  <small className="text-emerald-500 flex gap-1 items-center">
                    Delivered
                    <CheckCheck className="size-4" />
                  </small>
                ) : (
                  <small className="text-red-500 flex gap-1 items-center">
                    Not delivered
                    <CircleSlash className="size-4" />
                  </small>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <ChatSendMessage />
    </div>
  );
};

export default ChatContainer;
