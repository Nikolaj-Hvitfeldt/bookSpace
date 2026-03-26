type BookCardProps = {
  title: string;
  coverImage: string;
  progressPercentage?: number;
  size?: "default" | "small";
};

export type BookCardItem = {
  id: string;
  title: string;
  coverImage: string;
  progressPercentage?: number;
};

export default function BookCard({
  title,
  coverImage,
  progressPercentage,
  size = "default",
}: BookCardProps) {
  const hasProgress = typeof progressPercentage === "number";
  const progress = Math.max(0, Math.min(100, progressPercentage ?? 0));

  const isSmall = size === "small";
  const wrapperClass = isSmall
    ? "flex w-[100px] flex-col shrink-0 gap-[6px]"
    : "flex w-[120px] flex-col shrink-0 gap-[6px]";

  const imageClass = isSmall
    ? "h-[160px] w-[110px] rounded bg-primary-gray/50 object-cover shadow-md"
    : "h-[180px] w-[120px] rounded bg-primary-gray/50 object-cover shadow-md";

  return (
    <div className={wrapperClass}>
      <img src={coverImage} className={imageClass} />
      {hasProgress ? (
        <div className="mt-1 h-[4px] w-full overflow-hidden rounded-full bg-primary-brown/25">
          <div
            className="h-full rounded-full bg-primary-brown"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
      <h2 className="line-clamp-2 leading-[22px]!">{title}</h2>
    </div>
  );
}
