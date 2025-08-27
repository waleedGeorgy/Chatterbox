import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users, Check, X } from "lucide-react";

const Sidebar = () => {
  const { users, selectedUser, setSelectedUser, getUsers, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return (
      <aside className="h-full w-18 lg:w-60 border-r-2 border-base-200 flex flex-col transition-all duration-200">
        <div className="w-full p-4 space-y-3">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Users className="size-6" />
            <span className="hidden lg:block">Contacts</span>
          </div>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <div className="skeleton h-4 w-48 bg-neutral"></div>
          </div>
        </div>
        <div className="divider divide-primary w-[66%] mx-auto my-0"></div>
        <SidebarSkeleton />
      </aside>
    );
  }

  return (
    <aside className="h-full w-18 lg:w-60 border-r-2 border-base-200 flex flex-col transition-all duration-200">
      {/* Sidebar header */}
      <div className="w-full p-4 space-y-3">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <Users className="size-6" />
          <span className="hidden lg:block">Contacts</span>
        </div>
        <div className="flex flex-row items-center justify-center lg:justify-start">
          <label className="toggle toggle-xs toggle-primary">
            <input
              type="checkbox"
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
            />
            <X className="size-3 text-neutral" />
            <Check className="size-3 text-neutral" />
          </label>
          <p className="text-xs ml-2 hidden lg:block">
            Show online users{" "}
            <span className="opacity-60">{`(online ${
              onlineUsers.length - 1
            })`}</span>
          </p>
        </div>
      </div>
      <div className="divider divide-primary w-[66%] mx-auto my-0"></div>

      {/* Sidebar users */}
      <div className="overflow-y-auto w-full">
        {filteredUsers.map((user) => (
          // Sidebar user profile pic
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-3 py-2 flex items-center justify-center lg:justify-start gap-3 hover:bg-base-200 transition-colors cursor-pointer ${
              selectedUser?._id == user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div
              className={`avatar size-11 ${
                !user.profilePic ? "avatar-placeholder" : ""
              } ${onlineUsers.includes(user._id) ? "avatar-online" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0 p-[1px]">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={`Picture of ${user.name}`}
                    className="rounded-full size-full object-cover"
                  />
                ) : (
                  <div className="bg-primary size-full rounded-full flex items-center justify-center">
                    <span className="text-md font-bold text-base-100">
                      {user.name
                        .split(" ")
                        .map((word) => word[0].toUpperCase())}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar user name and status */}
            <div className="hidden lg:block text-left min-w-0">
              <h3 className="text-md truncate">{user.name}</h3>
              <p className="text-xs">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="p-1 text-center mt-4">
            <p className="text-xs lg:text-sm opacity-50">No online users</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
