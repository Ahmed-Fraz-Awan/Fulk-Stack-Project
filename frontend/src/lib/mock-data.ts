// Mock data used as graceful fallback when API is offline (great for demos)

export const mockKpis = {
  productivityScore: 82,
  burnoutRisk: 27,
  attendance: 91,
  assignmentCompletion: 88,
  focusScore: 76,
  consistency: 84,
};

export const mockWeekly = [
  { day: "Mon", productivity: 72, focus: 64, stress: 30 },
  { day: "Tue", productivity: 78, focus: 70, stress: 28 },
  { day: "Wed", productivity: 64, focus: 60, stress: 42 },
  { day: "Thu", productivity: 84, focus: 78, stress: 22 },
  { day: "Fri", productivity: 88, focus: 80, stress: 20 },
  { day: "Sat", productivity: 70, focus: 66, stress: 34 },
  { day: "Sun", productivity: 60, focus: 55, stress: 38 },
];

export const mockSubjects = [
  { subject: "Mathematics", score: 88, fullMark: 100 },
  { subject: "Physics", score: 74, fullMark: 100 },
  { subject: "DSA", score: 91, fullMark: 100 },
  { subject: "Databases", score: 67, fullMark: 100 },
  { subject: "AI/ML", score: 95, fullMark: 100 },
  { subject: "OS", score: 72, fullMark: 100 },
];

export const mockAttendance = Array.from({ length: 30 }).map((_, i) => ({
  date: `Day ${i + 1}`,
  present: Math.random() > 0.18 ? 1 : 0,
  rate: 80 + Math.round(Math.random() * 18),
}));

export const mockInsights = [
  {
    id: "1",
    title: "Peak focus window detected",
    body: "Your data shows highest concentration between 9–11 AM. Schedule deep work then.",
    tone: "positive" as const,
  },
  {
    id: "2",
    title: "Burnout risk rising on weekends",
    body: "Stress spikes Saturday. Add a 30‑minute walk and limit late‑night screens.",
    tone: "warning" as const,
  },
  {
    id: "3",
    title: "Databases needs attention",
    body: "Score trend is −12% this month. We've added a 3‑day micro‑revision plan.",
    tone: "info" as const,
  },
];

export const mockPlanner = [
  { time: "08:00", task: "Review yesterday's notes (20 min)", subject: "General", focus: 65 },
  { time: "09:00", task: "Deep work: DSA — Graphs (60 min)", subject: "DSA", focus: 92 },
  { time: "10:15", task: "Break + stretch", subject: "Wellness", focus: 0 },
  { time: "10:30", task: "Databases revision (45 min)", subject: "Databases", focus: 78 },
  { time: "11:30", task: "AI/ML project work (90 min)", subject: "AI/ML", focus: 88 },
  { time: "14:00", task: "Practice problems (45 min)", subject: "Mathematics", focus: 72 },
  { time: "16:00", task: "Light reading + summary (30 min)", subject: "Physics", focus: 60 },
  { time: "20:00", task: "Reflection journal", subject: "Wellness", focus: 50 },
];

export const mockNotifications = [
  { id: "n1", title: "Burnout alert", body: "Stress trend up 18% this week.", time: "2h ago", type: "warning" },
  { id: "n2", title: "Assignment due", body: "Databases — ER Model report in 18h.", time: "5h ago", type: "info" },
  { id: "n3", title: "Streak", body: "5‑day study streak — keep going!", time: "1d ago", type: "success" },
];

export const mockStudents = Array.from({ length: 12 }).map((_, i) => ({
  id: `s_${i + 1}`,
  name: ["Aarav", "Bilal", "Chloe", "Diya", "Eshan", "Fatima", "Gauri", "Hamza", "Iris", "Junaid", "Kiran", "Laila"][i],
  email: `student${i + 1}@univ.edu`,
  productivity: 50 + Math.round(Math.random() * 45),
  burnout: Math.round(Math.random() * 70),
  attendance: 70 + Math.round(Math.random() * 28),
  risk: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
}));
