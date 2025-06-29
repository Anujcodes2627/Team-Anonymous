import UserModel from "../models/Usermodel.js";

export const getDashboardData = async (req, res) => {
  try {
    const { userId } = req.query; // or req.body if POST

    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      name: user.name,
      stats: user.dashboardStats,
      weeklyData: user.weeklyData,
      goals: user.goals,
      achievements: user.achievements,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load dashboard", error: err.message });
  }
};
