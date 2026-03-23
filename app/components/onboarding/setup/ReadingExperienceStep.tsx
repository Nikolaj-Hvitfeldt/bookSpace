import { Button } from "~/components/ui/button";
import { useOutletContext } from "react-router";
import type { OnboardingContextType } from "~/layouts/onboardingLayout";

const heading = "What's Your Reading\nExperience Level?";
const text =
  "Let us know your reading experience so we can tailor recommendations that fit your journey.";

export default function ReadingExperienceStep() {
  const { selectedExperience, setSelectedExperience } =
    useOutletContext<OnboardingContextType>();

  function handleSelect(level: "beginner" | "intermediate" | "advanced") {
    setSelectedExperience(level);
    sessionStorage.setItem("reading-experience", level);
  }

  return (
    <>
      {/* Image */}
      <div className="flex flex-col">
        <div className="mt-6">
          {/* heading */}
          <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>

          {/* Text */}
          <p className="mt-4 whitespace-pre-line">{text}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-[10px]">
          <Button
            type="button"
            variant={
              selectedExperience === "beginner" ? "primary" : "secondary"
            }
            onClick={() => handleSelect("beginner")}
          >
            <div className="flex flex-col items-start mr-[80px]">
              <div
                className={
                  selectedExperience === "beginner"
                    ? "text-white text-[16px] font-semibold leading-normal"
                    : "text-black text-[16px] font-semibold leading-normal"
                }
              >
                Beginner
              </div>
              <div
                className={
                  selectedExperience === "beginner"
                    ? "text-white text-[14px] font-normal leading-normal"
                    : "text-black text-[14px] font-normal leading-normal"
                }
              >
                I'm just starting my reading journey.
              </div>
            </div>
          </Button>
          <Button
            type="button"
            variant={
              selectedExperience === "intermediate" ? "primary" : "secondary"
            }
            onClick={() => handleSelect("intermediate")}
          >
            <div className="flex flex-col items-start mr-[20px]">
              <div
                className={
                  selectedExperience === "intermediate"
                    ? "text-white text-[16px] font-semibold leading-normal"
                    : "text-black text-[16px] font-semibold leading-normal"
                }
              >
                Intermediate
              </div>
              <div
                className={
                  selectedExperience === "intermediate"
                    ? "text-white text-[14px] font-normal leading-normal"
                    : "text-black text-[14px] font-normal leading-normal"
                }
              >
                I read occasionally and want to explore more.
              </div>
            </div>
          </Button>
          <Button
            type="button"
            variant={
              selectedExperience === "advanced" ? "primary" : "secondary"
            }
            onClick={() => handleSelect("advanced")}
          >
            <div className="flex flex-col items-start ml-[10px]">
              <div
                className={
                  selectedExperience === "advanced"
                    ? "text-white text-[16px] font-semibold leading-normal"
                    : "text-black text-[16px] font-semibold leading-normal"
                }
              >
                Advanced
              </div>
              <div
                className={
                  selectedExperience === "advanced"
                    ? "text-white text-[14px] font-normal leading-normal"
                    : "text-black text-[14px] font-normal leading-normal"
                }
              >
                I'm a seasoned reader looking for new challenges.
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
