import { MessagesSquare } from "lucide-react";

const NoChatOpen = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-12">
      <div className="flex justify-center gap-4 mb-4">
        <div
          className="size-14 rounded-xl bg-primary/20 flex items-center
             justify-center animate-wiggle"
        >
          <MessagesSquare className="size-8 text-primary" />
        </div>
      </div>
      <h2 className="text-lg">Select a conversation to start!</h2>
    </div>
  );
};

export default NoChatOpen;
