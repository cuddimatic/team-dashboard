import React from "react";
import { useTeam } from "./useTeam";
import { Status } from "./types";
import "./App.css";

export default function App() {
  const { filteredTeam, filter, setFilter, updateStatus, summary, team } =
    useTeam();

  const filters: (Status | "all")[] = ["all", "available", "busy", "offline"];
  const statuses: Status[] = ["available", "busy", "offline"];

  return (
    <div className="app-container">
      <header className="header">
        <h1>Team Availability Dashboard</h1>
        <p>Monitor and manage your team’s current status</p>
      </header>

      <section className="summary-section">
        <div className="summary-card">
          <p>Available</p>
          <h2>{summary.available}</h2>
        </div>

        <div className="summary-card">
          <p>Busy</p>
          <h2>{summary.busy}</h2>
        </div>

        <div className="summary-card">
          <p>Offline</p>
          <h2>{summary.offline}</h2>
        </div>
      </section>

      <section>
        <h3>Filter Team</h3>
        <div className="filter-row">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="team-section">
        <h3>
          Team Members <span>({team.length} total)</span>
        </h3>

        <div className="team-grid">
          {filteredTeam.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-card-header">
                <div>
                  <h4>{member.name}</h4>
                  <p className="role">{member.role}</p>
                </div>

                <span className={`status-badge ${member.status}`}>
                  {member.status[0].toUpperCase() + member.status.slice(1)}
                </span>
              </div>

              <div className="status-buttons">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(member.id, status)}
                    className={`status-btn ${
                      member.status === status ? "active" : ""
                    }`}
                  >
                    {status[0].toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              <div className="others">
                <p className="tasks-count">Tasks: {member.tasksCompleted}</p>

                {member.returnTime && (
                  <p className="return-time">
                    Returned at: {member.returnTime}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
