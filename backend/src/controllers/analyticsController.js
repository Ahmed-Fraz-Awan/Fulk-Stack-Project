const ProductivityData = require("../models/ProductivityData");
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const MoodLog = require("../models/MoodLog");

function mockDashboard() {
  return {
    kpis: {
      productivityScore: 82,
      burnoutRisk: 27,
      attendance: 91,
      assignmentCompletion: 88,
      focusScore: 76,
      consistency: 84,
    },
    weekly: [
      { day: "Mon", productivity: 72, focus: 64, stress: 30 },
      { day: "Tue", productivity: 78, focus: 70, stress: 28 },
      { day: "Wed", productivity: 64, focus: 60, stress: 42 },
      { day: "Thu", productivity: 84, focus: 78, stress: 22 },
      { day: "Fri", productivity: 88, focus: 80, stress: 20 },
      { day: "Sat", productivity: 70, focus: 66, stress: 34 },
      { day: "Sun", productivity: 60, focus: 55, stress: 38 },
    ],
    subjects: [
      { subject: "Mathematics", score: 88, fullMark: 100 },
      { subject: "Physics", score: 74, fullMark: 100 },
      { subject: "DSA", score: 91, fullMark: 100 },
      { subject: "Databases", score: 67, fullMark: 100 },
      { subject: "AI/ML", score: 95, fullMark: 100 },
      { subject: "OS", score: 72, fullMark: 100 },
    ],
    insights: [
      {
        id: "1",
        title: "Peak focus window detected",
        body: "Your data shows highest concentration between 9–11 AM. Schedule deep work then.",
        tone: "positive",
      },
      {
        id: "2",
        title: "Burnout risk rising on weekends",
        body: "Stress spikes Saturday. Add a 30‑minute walk and limit late‑night screens.",
        tone: "warning",
      },
      {
        id: "3",
        title: "Databases needs attention",
        body: "Score trend is −12% this month. We've added a 3‑day micro‑revision plan.",
        tone: "info",
      },
    ],
  };
}

exports.dashboard = async (req, res, next) => {
  try {
    // If no DB / demo user, return mock so the UI never breaks
    if (!req.user || req.user.demo) return res.json(mockDashboard());

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [prod, att, asg] = await Promise.all([
      ProductivityData.find({ user: req.user.id, date: { $gte: since } }).sort({
        date: 1,
      }),
      Attendance.find({ user: req.user.id, date: { $gte: since } }),
      Assignment.find({ user: req.user.id }),
    ]);

    if (!prod.length && !att.length && !asg.length) {
      return res.json(mockDashboard());
    }

    const productivityScore =
      prod.length > 0
        ? Math.round(
            prod.reduce((a, b) => a + (b.productivityScore || 0), 0) /
              prod.length,
          )
        : 0;
    const focusScore =
      prod.length > 0
        ? Math.round(
            prod.reduce((a, b) => a + (b.focusScore || 0), 0) / prod.length,
          )
        : 0;
    const consistency =
      prod.length > 0
        ? Math.round(
            prod.reduce((a, b) => a + (b.consistency || 0), 0) / prod.length,
          )
        : 0;
    const presentCount = att.filter((a) => a.status === "present").length;
    const attendance =
      att.length > 0 ? Math.round((presentCount / att.length) * 100) : 0;
    const completedCount = asg.filter(
      (a) => a.status === "submitted" || a.status === "graded",
    ).length;
    const assignmentCompletion =
      asg.length > 0 ? Math.round((completedCount / asg.length) * 100) : 0;

    res.json({
      ...mockDashboard(),
      kpis: {
        productivityScore,
        burnoutRisk: 30,
        attendance,
        assignmentCompletion,
        focusScore,
        consistency,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.attendance = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo)
      return res.json({ items: [], rate: 0 });
    const items = await Attendance.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(60);
    const presents = items.filter((i) => i.status === "present").length;
    res.json({
      items,
      rate: items.length ? Math.round((presents / items.length) * 100) : 0,
    });
  } catch (err) {
    next(err);
  }
};

exports.productivity = async (req, res, next) => {
  try {
    if (!req.user || req.user.demo)
      return res.json({ items: [] });
    const items = await ProductivityData.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(30);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};
