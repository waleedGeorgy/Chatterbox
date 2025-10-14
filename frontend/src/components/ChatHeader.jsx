import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { MessageSquareX } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="border-b-2 border-base-200 p-2 bg-gradient-to-r from-base-300 to-primary/70">
      <div className="flex flex-row items-center justify-between gap-1">
        <div className=" flex items-center justify-center lg:justify-start gap-3">
          <div
            className={`avatar size-10 ${
              !selectedUser.profilePic ? "avatar-placeholder" : ""
            } ${onlineUsers.includes(selectedUser._id) ? "avatar-online" : ""}`}
          >
            <div className="mx-auto lg:mx-0 p-[1px]">
              {selectedUser.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={`Picture of ${selectedUser.name}`}
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
          <div className="text-left min-w-0">
            <h3 className="font-medium text-sm truncate">
              {selectedUser.name}
            </h3>
            <p className="text-xs">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSelectedUser(null)}
          className="cursor-pointer hover:scale-115 transition-all duration-200"
        >
          <MessageSquareX className="size-6 mr-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
