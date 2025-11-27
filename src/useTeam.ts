import { useEffect, useState } from "react";
import { TeamMember, Status } from "./types";

const STORAGE_KEY = "team_state";

const initialTeam: TeamMember[] = [
  { id: 1, name: "Alice", role: "Developer", status: "available", tasksCompleted: 0 },
  { id: 2, name: "Bob", role: "Designer", status: "busy", tasksCompleted: 0 },
  { id: 3, name: "Charlie", role: "QA", status: "offline", tasksCompleted: 0 },
  { id: 4, name: "Diana", role: "Developer", status: "available", tasksCompleted: 0 },
  { id: 5, name: "Ethan", role: "Product Manager", status: "busy", tasksCompleted: 0 },
  { id: 6, name: "Fiona", role: "QA", status: "available", tasksCompleted: 0 },
  { id: 7, name: "George", role: "DevOps", status: "offline", tasksCompleted: 0 },
  { id: 8, name: "Hannah", role: "Designer", status: "available", tasksCompleted: 0 },
  { id: 9, name: "Isaac", role: "Developer", status: "busy", tasksCompleted: 0 },
  { id: 10, name: "Jasmine", role: "Support", status: "offline", tasksCompleted: 0 },
  { id: 11, name: "Kevin", role: "Developer", status: "busy", tasksCompleted: 0 },
];

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const updateStatus = (id: number, newStatus: Status) => {
    setTeam(prev =>
      prev.map(member => {
        if (member.id !== id) return member;
  
        if (member.status === "offline" && newStatus === "available") {
          return {
            ...member,
            status: newStatus,
            returnTime: new Date().toLocaleTimeString(),
          };
        }
  
        if (member.status === "busy" && newStatus === "available") {
          return {
            ...member,
            status: newStatus,
            tasksCompleted: member.tasksCompleted + 1,
          };
        }
  
        return { ...member, status: newStatus };
      })
    );
  };
  

  const filteredTeam =
    filter === "all" ? team : team.filter(t => t.status === filter);

  const summary = {
    available: team.filter(t => t.status === "available").length,
    busy: team.filter(t => t.status === "busy").length,
    offline: team.filter(t => t.status === "offline").length,
  };

  return { team, filteredTeam, filter, setFilter, updateStatus, summary };
}
