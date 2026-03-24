type BookCardProps = {
  title: string;
  coverImage: string;
};

export default function BookCard({ title, coverImage }: BookCardProps) {
  return (
    <div className="flex w-[120px] flex-col flex-start gap[6px] shrink-0 gap-[10px]">
      <img
        src={coverImage}
        className="h-[180ox] align-stretch rounded bg-primary-grey/50 cover no-repeat"
      />
      <h2>{title}</h2>
    </div>
  );
}
