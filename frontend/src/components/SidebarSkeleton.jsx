const SidebarSkeleton = () => {
  return (
    <div className="overflow-y-auto w-full">
      {[...Array(9)].map((_, id) => (
        <div
          className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2"
          key={id}
        >
          <div className="skeleton size-11 shrink-0 rounded-full bg-neutral"></div>
          <div className="hidden lg:flex flex-col gap-2">
            <div className="skeleton h-3 w-27 bg-neutral"></div>
            <div className="skeleton h-3 w-15 bg-neutral"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
