import { useRef, useState } from "react";
import { Image, Loader, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import Toast from "./Toast";

const ChatSendMessage = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImagePreview = (e) => {
    const MAX_SIZE = 3 * 1024 * 1024;
    const image = e.target.files[0];
    if (!image) return;
    if (image.size > MAX_SIZE) {
      Toast("error", "Chosen file is too large");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsSendingMessage(true);
    if (!message.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: message.trim(),
        image: imagePreview,
      });
      setMessage("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsSendingMessage(false);
    } catch (error) {
      Toast("error", error);
    }
  };

  return (
    <div className="px-2 py-3 w-full">
      {imagePreview && (
        <div className="pb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Image preview"
              className="w-25 h-20 object-cover rounded-lg border border-accent"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2.5 -right-2.5 size-6 rounded-full bg-base-100
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="w-full input input-primary rounded-lg input-sm sm:input-md"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isSendingMessage}
          ref={fileInputRef}
          onChange={handleImagePreview}
        />
        <div className="tooltip tooltip-primary" data-tip="Max. size is 3 MBs">
          <button
            type="button"
            disabled={isSendingMessage}
            className={`btn btn-sm sm:btn-md btn-circle
                     ${imagePreview ? "text-emerald-500" : ""}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-4 sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md btn-circle"
          disabled={(!message.trim() && !imagePreview) || isSendingMessage}
        >
          {!isSendingMessage ? (
            <Send className="size-4 sm:size-5" />
          ) : (
            <Loader className="animate-spin" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatSendMessage;
