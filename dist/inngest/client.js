"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inngest = void 0;
const inngest_1 = require("inngest");
// Initialize the Inngest client
exports.inngest = new inngest_1.Inngest({
    id: "ai-therapist-agent",
    // You can add your Inngest signing key here if you have one
    eventKey: "rtc5UuDqGhxXXFHl3HLWiTD0l0aELrYPAGCx94igpQmNXg_Tm8LdqSW_VxY7DU-Zts6VV1lhZBHiXOoTg5tAzQ",
});
// Export the functions array (this will be populated by the functions.ts file)
exports.functions = [];
