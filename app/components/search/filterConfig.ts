export type AccordionContent = "slider" | "checkbox";
export type SliderPair = {
  left: string;
  right: string;
};

//Consolidated types either a slider or a checkbox row
export type FilterRowConfig =
  | {
      label: string;
      content: "slider";
      sliderPairs: SliderPair[];
    }
  | {
      label: string;
      content: "checkbox";
      options: string[];
    };

export type FilterAccordionConfig = {
  label: string;
  rows: FilterRowConfig[];
};

export const searchFilterConfig: FilterAccordionConfig[] = [
  {
    label: "Mood & Emotions",
    rows: [
      {
        label: "Emotional Tone",
        content: "slider",
        sliderPairs: [
          { left: "Happy", right: "Sad" },
          { left: "Funny", right: "Serious" },
          { left: "Optimistic", right: "Unusual" },
        ],
      },
      {
        label: "Content Intensity",
        content: "slider",
        sliderPairs: [
          { left: "Safe", right: "Disturbing" },
          { left: "Gentle", right: "Violent" },
        ],
      },
      {
        label: "Predictabillity & Style",
        content: "slider",
        sliderPairs: [
          { left: "Expected", right: "Unpredictable" },
          { left: "Conventional", right: "Unusual" },
          { left: "Larger than Life", right: "Down to Earth" },
        ],
      },
    ],
  },
  {
    label: "Character & Plot",
    rows: [
      {
        label: "Age",
        content: "checkbox",
        options: ["0-25", "26-50", "51-75", "76+"],
      },
      {
        label: "Sexuality",
        content: "checkbox",
        options: ["Straight", "Gay", "Pansexual"],
      },
      {
        label: "Gender",
        content: "checkbox",
        options: ["Male", "Female", "Non-binary", "Transgender"],
      },
      {
        label: "Plot",
        content: "checkbox",
        options: [
          "Conflict",
          "Open",
          "Generations",
          "Lots of twists and turns",
          "Revelation",
        ],
      },
    ],
  },
];
