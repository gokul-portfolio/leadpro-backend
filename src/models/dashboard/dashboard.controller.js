const dashboardService = require(
  "./dashboard.service"
);


// ==========================
// GET DASHBOARD DATA
// ==========================
const getDashboardData =
  async (
    req,
    res,
    next
  ) => {

    try {

      const dashboardData =
        await dashboardService.getDashboardData(
          req.user
        );

      res.status(200).json({
        success: true,
        data: dashboardData,
      });

    } catch (error) {

      next(error);
    }
  };


// ==========================
// EXPORTS
// ==========================
module.exports = {
  getDashboardData,
};