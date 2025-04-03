import User from "../models/User.js";

// Get Total Stats for Dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalParents = await User.countDocuments({ role: "parent" });

    res.status(200).json({ totalStudents, totalTeachers, totalParents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

// Get All Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

// Link Student to Parent
export const linkStudentToParent = async (req, res) => {
  const { studentEmail, parentEmail } = req.body;

  try {
    const student = await User.findOne({ email: studentEmail, role: "student" });
    const parent = await User.findOne({ email: parentEmail, role: "parent" });

    if (!student || !parent) {
      return res.status(404).json({ message: "Student or Parent not found" });
    }

    parent.assignedStudents.push(student._id);
    await parent.save();

    res.status(200).json({ message: "Student linked to parent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error linking student to parent", error });
  }
};
