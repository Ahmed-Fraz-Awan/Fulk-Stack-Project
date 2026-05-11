require("dotenv").config();
const { connectDB } = require("../config/db");
const mongoose = require("mongoose");

const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const ProductivityData = require("../models/ProductivityData");
const MoodLog = require("../models/MoodLog");
const TypingAnalytics = require("../models/TypingAnalytics");
const PlannerItem = require("../models/PlannerItem");
const Notification = require("../models/Notification");

const SUBJECTS = ["Mathematics", "Physics", "DSA", "Databases", "AI/ML", "OS"];

function rand(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

async function seed() {
  await connectDB();
  if (mongoose.connection.readyState !== 1) {
    console.error("Database not connected — seed aborted.");
    process.exit(1);
  }

  console.log("Clearing existing data…");
  await Promise.all([
    User.deleteMany({}),
    Attendance.deleteMany({}),
    Assignment.deleteMany({}),
    ProductivityData.deleteMany({}),
    MoodLog.deleteMany({}),
    TypingAnalytics.deleteMany({}),
    PlannerItem.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  console.log("Creating users…");
  const admin = await User.create({
    name: "Admin User",
    email: "admin@twin.ai",
    password: "admin1234",
    role: "admin",
  });

  const studentNames = [
    "Aarav Sharma",
    "Bilal Khan",
    "Chloe Wang",
    "Diya Patel",
    "Eshan Roy",
    "Fatima Khan",
    "Gauri Mehta",
    "Hamza Ali",
    "Iris Chen",
    "Junaid Iqbal",
  ];

  const students = [];
  for (const name of studentNames) {
    const email = name.toLowerCase().split(" ").join(".") + "@univ.edu";
    const u = await User.create({
      name,
      email,
      password: "student1234",
      role: "student",
      program: "Computer Science",
      semester: rand(4, 8),
    });
    students.push(u);
  }
  console.log(`Created ${students.length} students + 1 admin`);

  console.log("Creating attendance, assignments, productivity…");
  for (const s of students) {
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const subject = SUBJECTS[i % SUBJECTS.length];
      await Attendance.create({
        user: s._id,
        date: d,
        subject,
        status: Math.random() > 0.15 ? "present" : "absent",
      });
      await ProductivityData.create({
        user: s._id,
        date: d,
        studyMinutes: rand(60, 240),
        breakMinutes: rand(15, 60),
        productivityScore: rand(50, 95),
        focusScore: rand(45, 95),
        consistency: rand(60, 95),
        subjects: SUBJECTS.slice(0, 3).map((n) => ({
          name: n,
          minutes: rand(20, 90),
        })),
      });
      await MoodLog.create({
        user: s._id,
        date: d,
        mood: rand(2, 5),
        stress: rand(20, 70),
        sleepHours: 5 + Math.random() * 3,
      });
    }
    for (let i = 0; i < 6; i++) {
      const due = new Date();
      due.setDate(due.getDate() + rand(-10, 10));
      await Assignment.create({
        user: s._id,
        title: `${SUBJECTS[i % SUBJECTS.length]} task ${i + 1}`,
        subject: SUBJECTS[i % SUBJECTS.length],
        dueAt: due,
        status: Math.random() > 0.3 ? "graded" : "pending",
        score: rand(55, 98),
      });
    }
    for (let i = 0; i < 6; i++) {
      await TypingAnalytics.create({
        user: s._id,
        wpm: rand(38, 78),
        accuracy: rand(88, 99),
        pauses: rand(2, 14),
        sessionMinutes: rand(20, 80),
        engagementScore: rand(55, 95),
      });
    }
    await Notification.create({
      user: s._id,
      title: "Welcome to Digital Twin AI",
      body: "Your twin starts learning from today.",
      type: "success",
    });
  }

  console.log("\n✅ Seed complete.");
  console.log("Admin :  admin@twin.ai / admin1234");
  console.log("Student:  aarav.sharma@univ.edu / student1234");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
