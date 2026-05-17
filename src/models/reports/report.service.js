// backend/modules/reports/report.service.js

// =========================
// GET REPORT DATA
// =========================

const getReportService = async () => {

  try {

    // =========================
    // REPORT DATA
    // =========================

    const reportData = {

      totalRevenue: 485000,

      totalLeads: 245,

      completedProjects: 32,

      pendingTasks: 12,

      growthRate: 78,

      monthlyRevenue: [

        {
          month: "Jan",
          value: 120,
        },

        {
          month: "Feb",
          value: 180,
        },

        {
          month: "Mar",
          value: 220,
        },

        {
          month: "Apr",
          value: 160,
        },

        {
          month: "May",
          value: 260,
        },

        {
          month: "Jun",
          value: 200,
        },

      ],

      projectStatus: {

        active: 45,

        completed: 75,

        pending: 100,

      },

    };

    return reportData;

  } catch (error) {

    console.log(error);

    throw new Error(
      "Failed To Fetch Reports"
    );

  }

};

module.exports = {
  getReportService,
};