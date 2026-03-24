type BookCardProps = {
  title: string;
  coverImage: string;
};

export type BookCardItem = {
  id: string;
  title: string;
  coverImage: string;
};

export default function BookCard({ title, coverImage }: BookCardProps) {
  return (
    <div className="flex w-[120px] flex-col shrink-0 gap-[6px]">
      <img
        src={coverImage}
        className="h-[180px] w-[120px] rounded bg-primary-gray/50 object-cover shadow-md"
      />
      <h2 className="line-clamp-2 leading-[22px]!">{title}</h2>
    </div>
  );
}
