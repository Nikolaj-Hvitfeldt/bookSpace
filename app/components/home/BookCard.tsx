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
    <div className="flex w-[120px] flex-col shrink-0 gap-[10px]">
      <img
        src={coverImage}
        className="rounded bg-primary-grey/50 object-cover"
      />
      <h2>{title}</h2>
    </div>
  );
}
