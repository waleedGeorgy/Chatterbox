import ChatContainer from "../components/ChatContainer";
import NoChatOpen from "../components/NoChatOpen";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-base-200 font-inter">
      <div className="flex justify-center items-center pt-5 px-6">
        <div className="bg-base-300 rounded-xl shadow-md w-full max-w-7xl h-[calc(100vh-7rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <Sidebar />
            {!selectedUser ? <NoChatOpen /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
