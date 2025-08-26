const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-5">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-4xl bg-primary/30 shadow-lg ${
                i % 2 === 0 ? "animate-pulse" : "animate-wiggle"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-2 font-roboto">{title}</h2>
        <p className="text-base-content/60 font-inter">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
