const Lead = require(
  "../lead/lead.model"
);

const Client = require(
  "../client/client.model"
);

const Project = require(
  "../project/project.model"
);

const User = require(
  "../user/user.model"
);


// ==========================
// GET DASHBOARD DATA
// ==========================
const getDashboardData =
  async (user) => {

    // ==========================
    // FILTERS
    // ==========================
    const leadFilter = {};
    const projectFilter = {};

    // normal user
    if (user.role !== "admin") {

      leadFilter.createdBy =
        user.id;

      projectFilter.assignedMembers =
        user.id;
    }

    // ==========================
    // TOTAL LEADS
    // ==========================
    const totalLeads =
      await Lead.countDocuments(
        leadFilter
      );

    // ==========================
    // NEW LEADS
    // ==========================
    const newLeads =
      await Lead.countDocuments({
        ...leadFilter,
        status: "new",
      });

    // ==========================
    // FOLLOWUP LEADS
    // ==========================
    const followupLeads =
      await Lead.countDocuments({
        ...leadFilter,
        status: "followup",
      });

    // ==========================
    // QUALIFIED LEADS
    // ==========================
    const qualifiedLeads =
      await Lead.countDocuments({
        ...leadFilter,
        status: "qualified",
      });

    // ==========================
    // CLOSED LEADS
    // ==========================
    const closedLeads =
      await Lead.countDocuments({
        ...leadFilter,
        status: "closed",
      });

    // ==========================
    // REJECTED LEADS
    // ==========================
    const rejectedLeads =
      await Lead.countDocuments({
        ...leadFilter,
        status: "rejected",
      });

    // ==========================
    // TOTAL CLIENTS
    // ==========================
    const totalClients =
      await Client.countDocuments();

    // ==========================
    // TOTAL PROJECTS
    // ==========================
    const totalProjects =
      await Project.countDocuments(
        projectFilter
      );

    // ==========================
    // ACTIVE PROJECTS
    // ==========================
    const activeProjects =
      await Project.countDocuments({
        ...projectFilter,
        status:
          "In Progress",
      });

    // ==========================
    // COMPLETED PROJECTS
    // ==========================
    const completedProjects =
      await Project.countDocuments({
        ...projectFilter,
        status:
          "Completed",
      });

    // ==========================
    // TOTAL USERS
    // ==========================
    const totalUsers =
      await User.countDocuments({
        status: "active",
      });

    // ==========================
    // RECENT LEADS
    // ==========================
    const recentLeads =
      await Lead.find(
        leadFilter
      )

        .select(
          "clientName companyName status createdAt"
        )

        .sort({
          createdAt: -1,
        })

        .limit(5);

    // ==========================
    // RECENT PROJECTS
    // ==========================
    const recentProjects =
      await Project.find(
        projectFilter
      )

        .select(
          "projectName clientName status completionPercentage createdAt"
        )

        .sort({
          createdAt: -1,
        })

        .limit(5);

    // ==========================
    // FINAL RESPONSE
    // ==========================
    return {

      totalLeads,

      newLeads,

      followupLeads,

      qualifiedLeads,

      closedLeads,

      rejectedLeads,

      totalClients,

      totalProjects,

      activeProjects,

      completedProjects,

      totalUsers,

      recentLeads,

      recentProjects,
    };
  };


// ==========================
// EXPORTS
// ==========================
module.exports = {
  getDashboardData,
};