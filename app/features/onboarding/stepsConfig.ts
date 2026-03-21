//Maybe add progress bar status or something later
export const onboardingSteps = [
  {
    id: "landing",
    path: "/onboarding/landing",
    showHeader: false,
  },
  {
    id: "recommendation",
    path: "/onboarding/recommendation",
    showHeader: true,
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

export function getPreviousStepPath(pathname: string) {
  const index = getStepIndex(pathname);
  if (index === -1 || index === 0) return null;
  return onboardingSteps[index - 1].path;
}
