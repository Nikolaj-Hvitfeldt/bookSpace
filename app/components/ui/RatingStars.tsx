export default function RatingStar({ rating }: { rating: number }) {
  //Round the rating to the nearest number
  const filledStar = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex gap-[2px] text-[14px] leading-none text-primary-brown">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
          {index < filledStar ? (
            <img src="/globalImages/star-filled.svg" alt="Filled star" />
          ) : (
            <img src="/globalImages/star-empty.svg" alt="Empty star" />
          )}
        </div>
      ))}
    </div>
  );
}
