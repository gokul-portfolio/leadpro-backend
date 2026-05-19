// ==================================================
// FOLLOW CONTROLLER
// FILE: controllers/follow.controller.js
// ==================================================

const Follow = require(
  "../followup/follow.model"
);

// ==================================================
// CREATE FOLLOWUP
// ==================================================

const createFollowup = async (
  req,
  res
) => {

  try {

    console.log(req.body);

    const followup =
      await Follow.create(
        req.body
      );

    res.status(201).json({

      success: true,

      message:
        "Follow-up created successfully",

      data: followup,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ==================================================
// GET ALL FOLLOWUPS
// ==================================================

const getAllFollowups = async (
  req,
  res
) => {

  try {

    const followups =
      await Follow.find()

        .populate(
          "leadId"
        )

        .populate(
          "employeeId",
          "name email"
        )

        .sort({
          followupDate: 1,
        });

    res.status(200).json({

      success: true,

      count:
        followups.length,

      data: followups,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ==================================================
// GET SINGLE FOLLOWUP
// ==================================================

const getSingleFollowup = async (
  req,
  res
) => {

  try {

    const followup =
      await Follow.findById(
        req.params.id
      );

    if (!followup) {

      return res.status(404).json({

        success: false,

        message:
          "Follow-up not found",

      });

    }

    res.status(200).json({

      success: true,

      data: followup,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ==================================================
// GET UPCOMING FOLLOWUPS
// ==================================================

const getUpcomingFollowups =
  async (req, res) => {

    try {

      const today =
        new Date();

      const followups =
        await Follow.find({

          followupDate: {
            $gte: today,
          },

          isCompleted: false,

        }).sort({
          followupDate: 1,
        });

      res.status(200).json({

        success: true,

        count:
          followups.length,

        data: followups,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==================================================
// GET TODAY FOLLOWUPS
// ==================================================

const getTodayFollowups =
  async (req, res) => {

    try {

      const start =
        new Date();

      start.setHours(
        0,
        0,
        0,
        0
      );

      const end =
        new Date();

      end.setHours(
        23,
        59,
        59,
        999
      );

      const followups =
        await Follow.find({

          followupDate: {

            $gte: start,

            $lte: end,

          },

        });

      res.status(200).json({

        success: true,

        count:
          followups.length,

        data: followups,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==================================================
// GET OVERDUE FOLLOWUPS
// ==================================================

const getOverdueFollowups =
  async (req, res) => {

    try {

      const today =
        new Date();

      const followups =
        await Follow.find({

          followupDate: {
            $lt: today,
          },

          isCompleted: false,

        });

      res.status(200).json({

        success: true,

        count:
          followups.length,

        data: followups,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==================================================
// UPDATE FOLLOWUP
// ==================================================

const updateFollowup = async (
  req,
  res
) => {

  try {

    const followup =
      await Follow.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!followup) {

      return res.status(404).json({

        success: false,

        message:
          "Follow-up not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Follow-up updated successfully",

      data: followup,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ==================================================
// COMPLETE FOLLOWUP
// ==================================================

const completeFollowup =
  async (req, res) => {

    try {

      const followup =
        await Follow.findByIdAndUpdate(

          req.params.id,

          {
            isCompleted: true,
            completedAt: new Date(),
          },

          {
            new: true,
          }

        );

      if (!followup) {

        return res.status(404).json({

          success: false,

          message:
            "Follow-up not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Follow-up completed successfully",

        data: followup,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ==================================================
// DELETE FOLLOWUP
// ==================================================

const deleteFollowup = async (
  req,
  res
) => {

  try {

    const followup =
      await Follow.findByIdAndDelete(
        req.params.id
      );

    if (!followup) {

      return res.status(404).json({

        success: false,

        message:
          "Follow-up not found",

      });

    }

    res.status(200).json({

      success: true,

      message:
        "Follow-up deleted successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {

  createFollowup,

  getAllFollowups,

  getSingleFollowup,

  getUpcomingFollowups,

  getTodayFollowups,

  getOverdueFollowups,

  updateFollowup,

  completeFollowup,

  deleteFollowup,

};