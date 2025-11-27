# Team Availability Dashboard

This project is a **React-based dashboard** for monitoring and managing team member availability, tracking tasks completed, and recording return times. It provides a quick overview of team status and allows dynamic updates to each member’s availability.

---

## Table of Contents

- [Features](#features)  
- [Core Logic](#core-logic)  
- [State Management](#state-management)  
- [Rules & Implementation](#rules--implementation)  
- [Styling](#styling)  
- [Logic Decisions / Design Rationale](#logic-decisions--design-rationale)  
- [Project Structure](#project-structure)  
- [How to Run](#how-to-run)  

---

## Features

- Display **team members** with their roles, status, tasks completed, and return time.  
- **Filter** team members by status: Available, Busy, Offline, or All.  
- **Update status** dynamically with buttons for each team member.  
- **Summary cards** showing counts of Available, Busy, and Offline members.  
- Persist team state in **localStorage** so that data survives page reloads.  
- **Dynamic rules**: track when a member comes back online or completes tasks.

---

## Core Logic

The main logic is implemented in the **`useTeam.ts`** custom hook.

### State Initialization

The team state is initialized using React's `useState`. If there is a saved state in `localStorage`, it is loaded; otherwise, the default team is used. This ensures that the dashboard preserves data between page reloads.

### Status Updates

When a user updates a team member's status, the following rules are applied:

1. **Offline → Available:** Store the `returnTime` indicating when the member returned.  
2. **Busy → Available:** Increment the `tasksCompleted` counter.  
3. **Other changes:** Only update the `status` property.

Filtered views and summary counts are also calculated in this hook.

---

## State Management

- **React `useState`** manages the team list and the current filter.  
- **React `useEffect`** persists the `team` state to `localStorage` whenever it changes.  
- The `useTeam` hook exposes:
  - `team` – full list of members  
  - `filteredTeam` – members filtered by status  
  - `filter` & `setFilter` – current filter state  
  - `updateStatus` – function to update member status  
  - `summary` – counts of available, busy, and offline members  

This separation ensures the state logic is decoupled from the UI and makes the code easier to maintain and test.

---

## Rules & Implementation

The following rules govern status transitions:

- **Offline → Available:** Record the return time (`returnTime`).  
- **Busy → Available:** Increment the `tasksCompleted` counter.  
- **All other changes:** Update the `status` only.  

The rules are implemented in the `updateStatus` function inside the `useTeam` hook to maintain consistency across the dashboard.

---

## Styling

All styling is contained in `App.css`:

- `.team-card` – card layout for each member  
- `.status-badge` – color-coded badge based on member status  
- `.filter-btn` – buttons for filtering the team by status  
- `.return-time` – display the member's return time in a visually distinct style  

For example, the return time is displayed using:

- Italic text  
- Green color  
- Small margin for spacing  

This keeps the UI clean and readable while highlighting key information.

---

## Logic Decisions / Design Rationale

- **UI vs Logic Separation:** `App.tsx` renders the UI, while `useTeam.ts` handles state and rules.  
- **Type Safety:** TypeScript ensures consistent object structures via `TeamMember` and `Status`.  
- **Persistence:** `localStorage` prevents loss of data during page reloads.  
- **Simplicity:** The project is designed to be easy to understand and extend.  
- **Business Rule Clarity:** The rules for task counting and return time tracking are explicit and predictable.

---

## Project Structure

```text
src/
├── App.tsx        # Main app component rendering the dashboard
├── useTeam.ts     # Custom hook handling team state & logic
├── types.ts       # Type definitions (TeamMember, Status)
├── App.css        # Styling for the dashboard
```

---

## How to Run

1. Install dependencies:

```bash
npm install
npm start# team-dashboard
