import RatingStars from "../ui/RatingStars";
import { useState, useRef, useLayoutEffect } from "react";
import type { Review as ReviewType } from "~/types/review";
import { Form } from "react-router";

type reviewSectionProps = {
  reviews?: ReviewType[];
  bookId: string;
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReviewInput({ bookId }: { bookId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Form method="post" action="." className="w-full">
      <input type="hidden" name="submitFor" value="create-review" />
      <input type="hidden" name="bookId" value={bookId} />
      <input type="hidden" name="rating" value="5" />

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
                name="text"
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
            type="submit"
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
    </Form>
  );
}

function ReviewText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("44px");
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;
    if (isExpanded) {
      setMaxHeight(element.scrollHeight + "px");
    } else {
      setMaxHeight("44px");
    }
  }, [isExpanded, text]);

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <div role="button" onClick={toggle} className="cursor-pointer">
      <div
        ref={textRef}
        style={{
          maxHeight,
        }}
        className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
      >
        {/* Review text */}
        <div className="text-[15px] font-normal not-italic leading-[22px] text-black whitespace-pre-wrap">
          {text}
        </div>
      </div>
    </div>
  );
}

function Reviewitem({ review }: { review: ReviewType }) {
  return (
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
              {review.userName}
            </div>
            <RatingStars rating={review.rating} />
          </div>
        </div>

        {/* Review date */}
        <div className="pt-1 flex flex-col gap-[2px]">
          <div className="leading-[22px] font-semibold ml-auto">...</div>

          <div className="text-sm text-black/60">
            {formatDate(review.createdAt)}
          </div>
        </div>
      </div>

      {/* Review text */}
      <ReviewText text={review.text} />

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
  );
}

export default function ReviewSection({ reviews, bookId }: reviewSectionProps) {
  console.log("ReviewSection reviews", reviews?.length, reviews?.[0]);
  return (
    <div className="mt-4 space-y-4">
      <div className="text-[18px] font-semibold leading-[22px]">Reviews</div>
      <ReviewInput bookId={bookId} />
      <div className="mt-5 space-y-5">
        {reviews && reviews.length > 0 ? (
          reviews?.map((review) => (
            <Reviewitem key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center text-black/60">No reviews yet</div>
        )}
      </div>
    </div>
  );
}
