type RatingPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function RatingPicker({ value, onChange }: RatingPickerProps) {
  return (
    <div className="flex gap-px items-center text-[14px] leading-none text-primary-gray">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= value;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => onChange(starValue)}
            className="p-0.5 rounded border-0 bg-transparent cursor-pointer hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary-brown focus-visible:outline-offset-1"
          >
            {isFilled ? (
              <img
                src="/globalImages/star-filled.svg"
                alt="Filled star"
                className="h-4 w-4"
              />
            ) : (
              <img
                src="/globalImages/star-empty.svg"
                alt="Empty star"
                className="h-4 w-4"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
