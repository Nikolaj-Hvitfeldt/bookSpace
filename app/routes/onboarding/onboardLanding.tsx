import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

export default function OnboardingLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary-eggshell">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col items-center justify-start px-6 pt-[150px] pb-12">

        {/* Text (left aligned) */}
        <div className="w-full text-left">
          <h1 className="text-black leading-[32px]">
            <span className="block font-normal text-[28px]">Dive in with Book Space,</span>
            <span className="block font-normal text-[28px]">where books meet </span>
            <span className="block font-normal text-[28px]">connection</span>
          </h1>
        </div>

        {/* Icons */}
        <div className="mt-[80px] flex w-full justify-center">
          <div className="relative h-[190px] w-[253px]">

            {/* Book Text Icon */}
            <img
              src="/logos/Book-text-icon.svg"
              alt="Icon that says book"
              className="absolute left-[90px] top-[20px] w-auto -translate-x-1/2 h-auto"
            />

            {/* Books icon */}
            <img
              src="/logos/Books-icon.svg"
              alt="An icon of Books icon"
              className="absolute top-[75px] w-auto h-auto"
            />

            {/* Space Text Icon */}
            <img
              src="/logos/Space-text-icon.svg"
              alt="Icon that says space"
              className="absolute top-[90px] left-[90px] w-auto h-auto"
            />
          </div>
        </div>

        {/* Get started button */}
        <div className="mt-auto flex w-full justify-center">
          <Button
           className="w-full"
           variant="primary" 
           onClick={() => navigate("/")}>
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}