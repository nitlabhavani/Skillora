export const getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: "12,450",
      freelancers: "7,320",
      activeProjects: "1,284",
      totalRevenue: "$245,000",
      recentActivity: [
        {
          user: "John Doe",
          freelancer: "Client",
          role: "Posted Project",
          status: "Completed",
          statusClass: "success"
        },
        {
          user: "Sarah Smith",
          freelancer: "Freelancer",
          role: "Submitted Proposal",
          status: "Pending",
          statusClass: "pending"
        }
      ]
    };

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectsData = async (req, res) => {
  try {
    const projectCategories = [
      { name: "Web Development", icon: "🌐", total: 12, active: 5 },
      { name: "Graphic Design", icon: "🎨", total: 8, active: 3 },
      { name: "Digital Marketing", icon: "📈", total: 15, active: 7 },
      { name: "UI/UX Design", icon: "✨", total: 10, active: 4 },
      { name: "Content Writing", icon: "✍️", total: 20, active: 12 },
      { name: "Mobile App Dev", icon: "📱", total: 6, active: 2 },
      { name: "Data & Analytics", icon: "📊", total: 9, active: 5 },
      { name: "Cyber Security", icon: "🛡️", total: 4, active: 1 },
      { name: "AI Strategy", icon: "🤖", total: 7, active: 3 }
    ];

    return res.status(200).json({ success: true, projectCategories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getReportsData = async (req, res) => {
  try {
    const reportCategories = [
      { name: "Web Development", icon: "💰", status: "Updated", trend: "+12.5%" },
      { name: "Graphic Design", icon: "👥", status: "Active", trend: "+5.2%" },
      { name: "Digital Marketing", icon: "🚀", status: "Critical", trend: "-2.1%" },
      { name: "UI/UX", icon: "⭐", status: "Stable", trend: "+0.8%" },
      { name: "Data & Analytics", icon: "🖥️", status: "Healthy", trend: "Stable" },
      { name: "Content writing", icon: "🎯", status: "Updated", trend: "+4.3%" },
      { name: "Mobile Dev", icon: "🔄", status: "Active", trend: "+3.9%" },
      { name: "Cyber Security", icon: "🌍", status: "Stable", trend: "+8.1%" },
      { name: "AI Efficiency", icon: "🤖", status: "Updated", trend: "+15.0%" }
    ];

    return res.status(200).json({ success: true, reportCategories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
