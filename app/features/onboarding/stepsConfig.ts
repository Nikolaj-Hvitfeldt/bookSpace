
//Maybe add progress bar status or something later
export const onboardingSteps = [
  {
    id: "landing",
    path: "/onboarding/landing",
  },
  {
    id: "Whatever im gonna call the next one",
    path: "/onboarding/TBD",
  },
  {
    id: "Etc etc etc",
    path: "/onboarding/etcetcetc",
  },
];


export type OnboardingStep = (typeof onboardingSteps)[number];

export function getStepIndex(pathname: string) {
  return onboardingSteps.findIndex((step) => step.path === pathname);
}

export function getNextStepPath(pathname: string) {
  const index = getStepIndex(pathname);
  if (index === -1 || index === onboardingSteps.length - 1) return null;
  return onboardingSteps[index + 1].path;
}