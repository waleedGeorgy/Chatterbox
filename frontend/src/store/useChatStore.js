import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import Toast from "../components/Toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      Toast("error", error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userID}`);
      set({ messages: res.data });
    } catch (error) {
      Toast("error", error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        message
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      Toast("error", error.response.data.message);
    }
  },

  listenToNewMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const senderSocket = useAuthStore.getState().socket;

    senderSocket.on("sendNewMessage", (newMessage) => {
      if (newMessage.senderID !== selectedUser._id) return;
      
      set({ messages: [...get().messages, newMessage] });
    });
  },

  stopListeningToNewMessages: () => {
    const senderSocket = useAuthStore.getState().socket;
    senderSocket.off("sendNewMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
