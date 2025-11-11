import { Inngest } from "inngest";

// Initialize the Inngest client
export const inngest = new Inngest({
  id: "ai-therapist-agent",
  // You can add your Inngest signing key here if you have one
  eventKey:
    "rtc5UuDqGhxXXFHl3HLWiTD0l0aELrYPAGCx94igpQmNXg_Tm8LdqSW_VxY7DU-Zts6VV1lhZBHiXOoTg5tAzQ",
});

// Export the functions array (this will be populated by the functions.ts file)
export const functions: any[] = [];
