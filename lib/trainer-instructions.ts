export type TrainerInstructionResource = {
  title: string;
  description: string;
  type:
    | "instructional-video"
    | "youtube-video"
    | "pdf-document"
    | "quick-start-note"
    | "troubleshooting-note";
  url: string;
  thumbnail?: string | null;
  duration?: string | null;
};

export const trainerInstructionResources: Array<{
  heading: string;
  summary: string;
  items: TrainerInstructionResource[];
}> = [
  {
    heading: "Instructional Videos",
    summary: "Use these links for hosted walkthroughs, setup clips, or trainer-specific demos.",
    items: [
      {
        title: "Zoom Recording Walkthrough 40mins",
        description: "Recorded Zoom walkthrough for trainer onboarding, platform use, and process overview.",
        type: "instructional-video",
        url: "https://us06web.zoom.us/rec/share/afvURa1-bLawKOEevFRr9vOYSZyQWn7xbdlVIM45ZHT24dHf6rxHHvhoNVvnwD5N.bygGx4dGB8FMiWJ0?startTime=1778193880000",
        duration: null,
      },
    ],
  },
  {
    heading: "YouTube Videos",
    summary: "Add public or unlisted YouTube resources that trainers can open quickly from the ops area.",
    items: [
      {
        title: "Professional BE Kit video Instructions",
        description: "YouTube training video covering the platform workflow and trainer usage.",
        type: "youtube-video",
        url: "https://www.youtube.com/watch?v=VCRlc9M5bIY",
        duration: null,
      },
    ],
  },
  {
    heading: "PDF Documents",
    summary: "Store printable SOPs, reference guides, checklists, and troubleshooting sheets here.",
    items: [
      {
        title: "Precision Performance Overview V5 130526",
        description: "Core overview document for trainers covering the platform, workflow, and operating model.",
        type: "pdf-document",
        url: "/Precision%20Performance%20Overview%20V5%20130526.pdf",
      },
      {
        title: "Manual Test Spreedsheet HORSE V1",
        description: "Manual Excel spreadsheet for horse test entry, review, and trainer-side record handling.",
        type: "pdf-document",
        url: "/Manual%20Test%20Spreedsheet%20HORSE%20V1.xlsx",
      },
      {
        title: "Disclaimer and NDA",
        description: "Before commencing the Program Each Person agrees to Read and Sign Disclaimer and NDA.",
        type: "pdf-document",
        url: "/Precision%20Performance%20Disclaimer.pdf",
      },
    ],
  },
  {
    heading: "Quick-Start And Troubleshooting Notes",
    summary: "Keep fast reference links here for first-use setup, supporting media, and practical troubleshooting context.",
    items: [
      {
        title: "UNBOXING, The 4 Min Runthrough of Equipement",
        description: "Safe external reference link for the equipment unboxing runthrough until a smaller hosted export is ready.",
        type: "quick-start-note",
        url: "https://www.icloud.com/photos/#/i,pz,210DCDAC-9955-40F7-837A-2A5D9E36947A,38931/",
      },
      {
        title: "Add More Troubleshooting Notes Here",
        description: "Use this section for future notes such as login help, CSV import checks, or video support reminders.",
        type: "troubleshooting-note",
        url: "/data-entry/instructions",
      },
    ],
  },
];
