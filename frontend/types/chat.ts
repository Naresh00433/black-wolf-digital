export type ChatStep =
  | "GREETING"
  | "BUSINESS_NAME"
  | "INDUSTRY"
  | "SERVICE"
  | "BUDGET"
  | "TIMELINE"
  | "CONTACT"
  | "QUOTE"
  | "DONE";

export interface ChatState {
  step: ChatStep;

  businessName?: string;

  industry?: string;

  service?: string;

  budget?: string;

  timeline?: string;

  contact?: string;
}