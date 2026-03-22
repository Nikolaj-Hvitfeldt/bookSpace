//Maybe add progress bar status or something later
export const onboardingSteps: onboardingStep[] = [
  {
    id: "landing",
    path: "/onboarding/landing",
    showHeader: false,
    buttons: [
      {
        label: "Get started",
        variant: "primary",
      },
    ],
  },
  {
    id: "recommendation",
    path: "/onboarding/recommendation",
    showHeader: true,
    progressBar: {
      total: 3,
      current: 1,
    },
    buttons: [
      {
        label: "Next",
        variant: "secondary",
      },
    ],
  },
  {
    id: "community",
    path: "/onboarding/community",
    showHeader: true,
    progressBar: {
      total: 3,
      current: 2,
    },
    buttons: [
      {
        label: "Next",
        variant: "secondary",
      },
    ],
  },
  {
    id: "tracking",
    path: "/onboarding/tracking",
    showHeader: true,
    progressBar: {
      total: 3,
      current: 3,
    },
    buttons: [
      {
        label: "Get started",
        variant: "primary",
      },
    ],
  },
  {
    id: "get-started",
    path: "/onboarding/get-started",
    showHeader: false,
    buttons: [
      {
        label: "Create an account",
        variant: "primary",
      },
      {
        label: "Explore the app first",
        variant: "secondary",
      },
    ],
  },
  {
    id: "favorite-books",
    path: "/onboarding/favorite-books",
    showHeader: true,
    progressBar: {
      total: 5,
      current: 1,
    },
    buttons: [
      {
        label: "Next",
        variant: "secondary",
      },
    ],
  },
  {
    id: "favorite-genres",
    path: "/onboarding/favorite-genres",
    showHeader: true,
    progressBar: {
      total: 5,
      current: 2,
    },
    buttons: [
      {
        label: "Next",
        variant: "secondary",
      },
    ],
  },
];

type progressBarStep = {
  total: number;
  current: number;
};

type onboardingStep = {
  id: string;
  path: string;
  showHeader: boolean;
  progressBar?: progressBarStep;
  buttons: buttonConfig[];
};

type buttonConfig = {
  label: string;
  variant: "primary" | "secondary";
};

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
