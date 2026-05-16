const projectService = require(
  "./project.service"
);


// ==========================
// CREATE PROJECT
// ==========================
const createProject =
  async (
    req,
    res,
    next
  ) => {

    try {

      const project =
        await projectService.createProject(
          req.body,
          req.user
        );

      res.status(201).json({
        success: true,
        message:
          "Project created successfully",
        data: project,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// GET PROJECTS
// SEARCH + FILTER + SORT
// ==========================
const getProjects =
  async (
    req,
    res,
    next
  ) => {

    try {

      const projects =
        await projectService.getProjects(
          req.query,
          req.user
        );

      res.status(200).json({
        success: true,
        count:
          projects.length,
        data: projects,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// GET SINGLE PROJECT
// ==========================
const getSingleProject =
  async (
    req,
    res,
    next
  ) => {

    try {

      const project =
        await projectService.getSingleProject(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: project,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// UPDATE PROJECT
// ==========================
const updateProject =
  async (
    req,
    res,
    next
  ) => {

    try {

      const project =
        await projectService.updateProject(
          req.params.id,
          req.body,
          req.user
        );

      res.status(200).json({
        success: true,
        message:
          "Project updated successfully",
        data: project,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// DELETE PROJECT
// ==========================
const deleteProject =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await projectService.deleteProject(
          req.params.id,
          req.user
        );

      res.status(200).json({
        success: true,
        ...result,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// ASSIGN MEMBERS
// ==========================
const assignMembers =
  async (
    req,
    res,
    next
  ) => {

    try {

      const project =
        await projectService.assignMembers(
          req.params.id,
          req.body.assignedMembers,
          req.user
        );

      res.status(200).json({
        success: true,
        message:
          "Members assigned successfully",
        data: project,
      });

    } catch (err) {

      next(err);
    }
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