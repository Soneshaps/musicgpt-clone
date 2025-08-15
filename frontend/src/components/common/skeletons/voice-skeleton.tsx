const VoiceSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-pulse rounded-full bg-neutral-hover"></div>
          <div className="h-3 w-16 animate-pulse rounded bg-neutral-hover"></div>
        </div>
      ))}
    </>
  );
};

export default VoiceSkeleton;
