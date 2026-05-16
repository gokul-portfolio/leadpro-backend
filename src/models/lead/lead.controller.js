const leadService = require(
  "./lead.service"
);


// ==========================
// CREATE LEAD
// ==========================
const createLead = async (
  req,
  res,
  next
) => {

  try {

    const lead =
      await leadService.createLead(
        req.body,
        req.user
      );

    res.status(201).json({
      success: true,
      message:
        "Lead created successfully",
      data: lead,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// GET ALL LEADS
// SEARCH + FILTER + SORT
// ==========================
const getLeads = async (
  req,
  res,
  next
) => {

  try {

    const leads =
      await leadService.getLeads(
        req.query,
        req.user
      );

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// GET SINGLE LEAD
// ==========================
const getSingleLead = async (
  req,
  res,
  next
) => {

  try {

    const lead =
      await leadService.getSingleLead(
        req.params.id,
        req.user
      );

    res.status(200).json({
      success: true,
      data: lead,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// UPDATE LEAD
// ==========================
const updateLead = async (
  req,
  res,
  next
) => {

  try {

    const lead =
      await leadService.updateLead(
        req.params.id,
        req.body,
        req.user
      );

    res.status(200).json({
      success: true,
      message:
        "Lead updated successfully",
      data: lead,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// DELETE LEAD
// ==========================
const deleteLead = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await leadService.deleteLead(
        req.params.id,
        req.user
      );

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// ASSIGN LEAD
// ==========================
const assignLead = async (
  req,
  res,
  next
) => {

  try {

    const lead =
      await leadService.assignLead(
        req.params.id,
        req.body.assignedTo,
        req.user
      );

    res.status(200).json({
      success: true,
      message:
        "Lead assigned successfully",
      data: lead,
    });

  } catch (error) {

    next(error);
  }
};


// ==========================
// EXPORTS
// ==========================
module.exports = {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
  assignLead,
};