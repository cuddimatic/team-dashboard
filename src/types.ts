export type Status = "available" | "busy" | "offline";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: Status;
  returnTime?: string; 
  tasksCompleted: number;
}
