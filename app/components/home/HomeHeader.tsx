import { SearchBar } from "~/components/ui/searchbar";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookSection from "./BookSection";

type HomeHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

//Change to Avif when my daily reset of conversions on the website hits
const slides = [
  {
    id: 1,
    src: "/banner/banner1.png",
    alt: "Winter book collection banner",
  },
  { id: 2, src: "/banner/banner2.png", alt: "Featured books banner" },
  { id: 3, src: "/banner/banner3.png", alt: "Popular books banner" },
];

function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[10px] bg-primary-brown/25">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 z-20 bottom-[6px] flex justify-center">
        <div className="flex items-center gap-[10px]">
          {slides.map((slide, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={[
                  "h-[5px] w-[100px] rounded-full border-0 shrink-0 transition-colors",
                  isActive ? "bg-primary-brown" : "bg-primary-brown/25",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HomeHeader({
  searchValue,
  onSearchChange,
}: HomeHeaderProps) {
  return (
    <header className="w-full">
      <SearchBar
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      ></SearchBar>

      <div className="space-y-2 mt-2">
        <div className="text-[18px] font-semibold leading-[22px]">Discover</div>
        <BannerSlider />

        <BookSection
          sectionTitle="Currently Reading"
          books={[
            {
              title: "Very long title that will wrap to the next line",
              coverImage: "testImages/testCard.png",
              id: "1",
            },
          ]}
        />
      </div>
    </header>
  );
}
