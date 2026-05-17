// backend/modules/reports/report.controller.js

const {
  getReportService,
} = require("./report.service");

// =========================
// GET REPORTS
// =========================

const getReports = async (req, res) => {

  try {

    // =========================
    // SERVICE CALL
    // =========================

    const reports =
      await getReportService();

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      success: true,

      data: reports,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Report Fetch Failed",

    });

  }

};

module.exports = {
  getReports,
};