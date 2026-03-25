import RatingStars from "../ui/RatingStars";
import { useState, useRef, useLayoutEffect } from "react";

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

function ReviewInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-full border-2 border-primary-brown flex items-center justify-center">
        <img
          src="/reviewImages/review-avatar.svg"
          alt="avatar"
          className="h-[40px] w-[40px] shrink-0"
        />
      </div>

      <div className="flex items-center gap-1">
        <div className="rounded-[10px] border border-primary-brown bg-transparent">
          <div
            className={[
              "flex w-[280px] px-2 items-center gap-[10px]",
              "transition-[height,padding] duration-200",
              isExpanded
                ? "h-[120px] py-1 items-start"
                : "h-[34px] py-1 items-center",
            ].join(" ")}
          >
            <textarea
              rows={1}
              placeholder="Write a review"
              onFocus={() => setIsExpanded(true)}
              onBlur={(e) => {
                if (!e.currentTarget.value.trim()) setIsExpanded(false);
              }}
              className={[
                "w-full resize-none bg-transparent text-[15px] leading-[22px] text-black outline-none placeholder:text-black/40",
                isExpanded
                  ? "h-full overflow-auto"
                  : "h-[22px] overflow-hidden",
              ].join(" ")}
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Send review"
          className="h-[34px] w-[34px] shrink-0 flex items-center justify-center"
        >
          <img
            src="/reviewImages/send-icon.svg"
            alt="send"
            className="h-5 w-5 shrink-0"
          />
        </button>
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const [expandedById, setExpandedById] = useState<Record<string, boolean>>({});
  const toggleReview = (id: string) =>
    setExpandedById((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mt-4 space-y-4">
      <div className="text-[18px] font-semibold leading-[22px]">Reviews</div>

      <ReviewInput />

      {/* Reviews list */}
      <div className="space-y-5 mt-5">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full border-2 border-primary-brown flex items-center justify-center text-primary-brown">
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

            <div
              role="button"
              onClick={() => toggleReview(review.id)}
              className="cursor-pointer"
            >
              <div
                style={{
                  maxHeight: expandedById[review.id] ? "140px" : "44px",
                }}
                className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
              >
                {/* Review text */}
                <div className="text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap">
                  {review.text}
                </div>
              </div>
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
