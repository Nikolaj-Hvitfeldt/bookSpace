import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

const text = "Dive in with Book Space,\nwhere books meet\nconnection";

export default function OnboardingLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-secondary-eggshell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col items-center justify-start px-[clamp(16px,4vw,24px)] pt-[clamp(84px,12vh,168px)] pb-12">

        {/* Text (left aligned) */}
        <div className="w-full text-left">
          <h1 className="onboarding-title whitespace-pre-line">
            {text}
          </h1>
        </div>

        {/* Icons */}
        <div className="mt-[clamp(40px,8vh,80px)] flex w-full justify-center">
          <div className="relative h-[190px] w-[253px]">

            {/* Book Text Icon */}
            <img
              src="/logos/Book-text-icon.svg"
              alt="Icon that says book"
              className="absolute left-[90px] top-[20px] w-auto -translate-x-1/2 h-auto"
              aria-hidden = {true}
            />

            {/* Books icon */}
            <img
              src="/logos/Books-icon.svg"
              alt="An icon of Books icon"
              className="absolute top-[75px] w-auto h-auto"
              aria-hidden = {true}
            />

            {/* Space Text Icon */}
            <img
              src="/logos/Space-text-icon.svg"
              alt="Icon that says space"
              className="absolute top-[90px] left-[90px] w-auto h-auto"
              aria-hidden = {true}
            />
          </div>   
        </div>

            {/* Get started button */}
        <div className="mt-auto flex w-full justify-center">
            <Button
                type="button"
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