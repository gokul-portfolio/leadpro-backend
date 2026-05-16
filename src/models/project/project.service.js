const Project = require(
  "./project.model"
);


// ==========================
// CREATE PROJECT
// ==========================
const createProject = async (
  data,
  user
) => {

  // only admin can create
  if (user.role !== "admin") {

    throw new Error(
      "Only admin can create project"
    );
  }

  // create project
  const project =
    await Project.create({

      projectName:
        data.projectName,

      clientName:
        data.clientName,

      description:
        data.description,

      status:
        data.status,

      completionPercentage:
        data.completionPercentage,

      startDate:
        data.startDate,

      deadline:
        data.deadline,

      priority:
        data.priority,

      assignedMembers:
        data.assignedMembers || [],

      createdBy:
        user.id,
    });

  return project;
};


// ==========================
// GET ALL PROJECTS
// SEARCH + FILTER + SORT
// ==========================
const getProjects = async (
  query,
  user
) => {

  const filter = {};

  // ==========================
  // ROLE CHECK
  // ==========================

  // admin → all projects
  if (user.role !== "admin") {

    filter.assignedMembers =
      user.id;
  }

  // ==========================
  // STATUS FILTER
  // ==========================
  if (query.status) {

    filter.status =
      query.status;
  }

  // ==========================
  // PRIORITY FILTER
  // ==========================
  if (query.priority) {

    filter.priority =
      query.priority;
  }

  // ==========================
  // SEARCH
  // ==========================
  if (
    query.search &&
    query.search.trim() !== ""
  ) {

    const searchRegex =
      new RegExp(
        query.search,
        "i"
      );

    filter.$or = [

      {
        projectName:
          searchRegex,
      },

      {
        clientName:
          searchRegex,
      },

      {
        description:
          searchRegex,
      },

      {
        status:
          searchRegex,
      },

      {
        priority:
          searchRegex,
      },
    ];
  }

  // ==========================
  // SORT
  // ==========================
  let sortOption = {
    createdAt: -1,
  };

  // newest
  if (
    query.sort ===
    "newest"
  ) {

    sortOption = {
      createdAt: -1,
    };
  }

  // oldest
  if (
    query.sort ===
    "oldest"
  ) {

    sortOption = {
      createdAt: 1,
    };
  }

  // priority high
  if (
    query.sort ===
    "priorityHigh"
  ) {

    sortOption = {
      priority: -1,
    };
  }

  // completion high
  if (
    query.sort ===
    "completionHigh"
  ) {

    sortOption = {
      completionPercentage: -1,
    };
  }

  // deadline nearest
  if (
    query.sort ===
    "deadlineNearest"
  ) {

    sortOption = {
      deadline: 1,
    };
  }

  // ==========================
  // GET PROJECTS
  // ==========================
  const projects =
    await Project.find(filter)

      .populate(
        "assignedMembers",
        "name email designation"
      )

      .populate(
        "createdBy",
        "name email"
      )

      .sort(sortOption);

  return projects;
};


// ==========================
// GET SINGLE PROJECT
// ==========================
const getSingleProject =
  async (id) => {

    const project =
      await Project.findById(id)

        .populate(
          "assignedMembers",
          "name email designation"
        )

        .populate(
          "createdBy",
          "name email"
        );

    if (!project) {

      throw new Error(
        "Project not found"
      );
    }

    return project;
  };


// ==========================
// UPDATE PROJECT
// ==========================
const updateProject =
  async (
    id,
    data,
    user
  ) => {

    const project =
      await Project.findById(id);

    if (!project) {

      throw new Error(
        "Project not found"
      );
    }

    // check access
    const isAssigned =
      project.assignedMembers.some(
        (member) =>
          member.toString() ===
          user.id
      );

    if (
      user.role !== "admin" &&
      !isAssigned
    ) {

      throw new Error(
        "Access denied"
      );
    }

    // update fields
    project.projectName =
      data.projectName ||
      project.projectName;

    project.clientName =
      data.clientName ||
      project.clientName;

    project.description =
      data.description ||
      project.description;

    project.status =
      data.status ||
      project.status;

    project.completionPercentage =
      data.completionPercentage ??
      project.completionPercentage;

    project.startDate =
      data.startDate ||
      project.startDate;

    project.deadline =
      data.deadline ||
      project.deadline;

    project.priority =
      data.priority ||
      project.priority;

    // save
    await project.save();

    return project;
  };


// ==========================
// DELETE PROJECT
// ==========================
const deleteProject =
  async (
    id,
    user
  ) => {

    // admin only
    if (user.role !== "admin") {

      throw new Error(
        "Only admin can delete project"
      );
    }

    const project =
      await Project.findById(id);

    if (!project) {

      throw new Error(
        "Project not found"
      );
    }

    await project.deleteOne();

    return {
      message:
        "Project deleted successfully",
    };
  };


// ==========================
// ASSIGN MEMBERS
// ==========================
const assignMembers =
  async (
    id,
    assignedMembers,
    user
  ) => {

    // admin only
    if (user.role !== "admin") {

      throw new Error(
        "Only admin can assign members"
      );
    }

    const project =
      await Project.findById(id);

    if (!project) {

      throw new Error(
        "Project not found"
      );
    }

    project.assignedMembers =
      assignedMembers;

    await project.save();

    return project;
  };


// ==========================
// EXPORTS
// ==========================
module.exports = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  assignMembers,
};