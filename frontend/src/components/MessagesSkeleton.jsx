const MessagesSkeleton = () => {
  const skeletonMessages = Array(5).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-1">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat space-y-1 ${
            idx % 2 === 0 ? "chat-start" : "chat-end"
          }`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full bg-neutral" />
            </div>
          </div>

          <div className="chat-header">
            <div className="skeleton h-4 w-16 bg-neutral" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-14 w-56 bg-neutral" />
          </div>

          <div className="chat-footer">
            <div className="skeleton h-4 w-10 bg-neutral" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesSkeleton;
