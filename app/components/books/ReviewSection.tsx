import RatingStars from "../ui/RatingStars";

type Review = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  helpfulCount: number;
  notHelpfulCount: number;
};

const reviews: Review[] = [
  {
    id: "1",
    author: "Laura Nielsen",
    date: "7th November, 2023",
    rating: 5,
    text: "What makes The Goldfinch so compelling is Tartt’s immersive, almost cinematic storytelling. The novel spans years and landscapes—from the grimness of New York City to the vast desolation of the Nevada desert. Tartt’s… more",
    helpfulCount: 1,
    notHelpfulCount: 1,
  },
  {
    id: "2",
    author: "Laura Nielsen",
    date: "7th November, 2023",
    rating: 5,
    text: "What makes The Goldfinch so compelling is Tartt’s immersive, almost cinematic storytelling. Tartt’s… more",
    helpfulCount: 1,
    notHelpfulCount: 1,
  },
  {
    id: "3",
    author: "Johnny Deluxe",
    date: "1st january, 2026",
    rating: 3,
    text: "This was ass",
    helpfulCount: 69,
    notHelpfulCount: 420,
  },
];

export default function ReviewSection() {
  return (
    <div className="mt-4 space-y-4">
      <div className="text-[18px] font-semibold leading-[22px]">Reviews</div>

      {/* Reviews list */}
      <div className="space-y-5 mt-5">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full border-2 border-primary-brown/80 flex items-center justify-center text-primary-brown">
                  <img
                    src="/reviewImages/review-avatar.svg"
                    alt="avatar"
                    className="h-[40px] w-[40px] shrink-0"
                  />
                </div>

                {/* Name and rating */}
                <div className="pt-1 flex flex-col gap-[2px]">
                  <div className="text-[18px] font-semibold leading-[22px]">
                    {review.author}
                  </div>
                  <RatingStars rating={review.rating} />
                </div>
              </div>

              {/* Review date */}
              <div className="pt-1 flex flex-col gap-[2px]">
                <div className="leading-[22px] font-semibold ml-auto">...</div>

                <div className="text-sm text-black/60">{review.date}</div>
              </div>
            </div>

            {/* Review text */}
            <div className="text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap">
              {review.text}
            </div>

            {/* Review helpful and not helpful */}
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-[14px] text-primary-brown">
                <img
                  src="/reviewImages/thumbs-up.svg"
                  alt="thumbs-up"
                  className="h-[17px] w-[17px] shrink-0"
                />

                <div>{`Helpful (${review.helpfulCount})`}</div>
              </div>
              <div className="flex items-center gap-2 text-[14px] text-primary-brown">
                <img
                  src="/reviewImages/thumbs-down.svg"
                  alt="thumbs-down"
                  className="h-[17px] w-[17px] shrink-0"
                />

                <div>{`Not helpful (${review.notHelpfulCount})`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
