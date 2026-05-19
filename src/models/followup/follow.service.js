// ==================================================
// FOLLOW SERVICE
// FILE: services/follow.service.js
// ==================================================

const Follow = require(
  "../followup/follow.model"
);

// ==================================================
// CREATE FOLLOWUP
// ==================================================

const createFollowupService =
  async (data) => {

    const followup =
      await Follow.create(data);

    return followup;

  };

// ==================================================
// GET ALL FOLLOWUPS
// ==================================================

const getAllFollowupsService =
  async () => {

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

    return followups;

  };

// ==================================================
// GET SINGLE FOLLOWUP
// ==================================================

const getSingleFollowupService =
  async (id) => {

    const followup =
      await Follow.findById(id)

        .populate(
          "leadId"
        )

        .populate(
          "employeeId",
          "name email"
        );

    return followup;

  };

// ==================================================
// GET UPCOMING FOLLOWUPS
// ==================================================

const getUpcomingFollowupsService =
  async () => {

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

    return followups;

  };

// ==================================================
// GET TODAY FOLLOWUPS
// ==================================================

const getTodayFollowupsService =
  async () => {

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

    return followups;

  };

// ==================================================
// GET OVERDUE FOLLOWUPS
// ==================================================

const getOverdueFollowupsService =
  async () => {

    const today =
      new Date();

    const followups =
      await Follow.find({

        followupDate: {
          $lt: today,
        },

        isCompleted: false,

      });

    return followups;

  };

// ==================================================
// UPDATE FOLLOWUP
// ==================================================

const updateFollowupService =
  async (id, data) => {

    const followup =
      await Follow.findByIdAndUpdate(

        id,

        data,

        {
          new: true,
          runValidators: true,
        }

      );

    return followup;

  };

// ==================================================
// COMPLETE FOLLOWUP
// ==================================================

const completeFollowupService =
  async (id) => {

    const followup =
      await Follow.findByIdAndUpdate(

        id,

        {
          isCompleted: true,
          completedAt: new Date(),
        },

        {
          new: true,
        }

      );

    return followup;

  };

// ==================================================
// DELETE FOLLOWUP
// ==================================================

const deleteFollowupService =
  async (id) => {

    const followup =
      await Follow.findByIdAndDelete(
        id
      );

    return followup;

  };

// ==================================================
// EXPORTS
// ==================================================

module.exports = {

  createFollowupService,

  getAllFollowupsService,

  getSingleFollowupService,

  getUpcomingFollowupsService,

  getTodayFollowupsService,

  getOverdueFollowupsService,

  updateFollowupService,

  completeFollowupService,

  deleteFollowupService,

};