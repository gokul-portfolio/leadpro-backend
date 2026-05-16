const Lead = require("./lead.model");


// ==========================
// CREATE LEAD
// ==========================
const createLead = async (
  data,
  user
) => {

  const lead =
    await Lead.create({
      ...data,
      createdBy: user.id,
    });

  return lead;
};


// ==========================
// GET ALL LEADS
// SEARCH + FILTER + SORT
// ==========================
const getLeads = async (
  query,
  user
) => {

  const filter = {};

  // ==========================
  // ROLE CHECK
  // ==========================
  if (user.role !== "admin") {

    filter.createdBy =
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
  // LEAD SOURCE FILTER
  // ==========================
  if (query.leadSource) {

    filter.leadSource =
      query.leadSource;
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
        clientName:
          searchRegex,
      },

      {
        companyName:
          searchRegex,
      },

      {
        email:
          searchRegex,
      },

      {
        mobileNumber:
          searchRegex,
      },

      {
        serviceRequired:
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

  // budget low → high
  if (
    query.sort ===
    "budgetLow"
  ) {

    sortOption = {
      budget: 1,
    };
  }

  // budget high → low
  if (
    query.sort ===
    "budgetHigh"
  ) {

    sortOption = {
      budget: -1,
    };
  }

  // ==========================
  // GET LEADS
  // ==========================
  const leads =
    await Lead.find(filter)
      .populate(
        "createdBy",
        "name email"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .sort(sortOption);

  return leads;
};


// ==========================
// GET SINGLE LEAD
// ==========================
const getSingleLead = async (
  id,
  user
) => {

  const lead =
    await Lead.findById(id)
      .populate(
        "createdBy",
        "name email"
      )
      .populate(
        "assignedTo",
        "name email"
      );

  if (!lead) {

    throw new Error(
      "Lead not found"
    );
  }

  // user can view only own lead
  if (
    user.role !== "admin" &&
    lead.createdBy._id.toString() !==
      user.id
  ) {

    throw new Error(
      "Access denied"
    );
  }

  return lead;
};


// ==========================
// UPDATE LEAD
// ==========================
const updateLead = async (
  id,
  data,
  user
) => {

  const lead =
    await Lead.findById(id);

  if (!lead) {

    throw new Error(
      "Lead not found"
    );
  }

  // user can update only own lead
  if (
    user.role !== "admin" &&
    lead.createdBy.toString() !==
      user.id
  ) {

    throw new Error(
      "Access denied"
    );
  }

  Object.assign(
    lead,
    data
  );

  await lead.save();

  return lead;
};


// ==========================
// DELETE LEAD
// ==========================
const deleteLead = async (
  id,
  user
) => {

  // admin only
  if (user.role !== "admin") {

    throw new Error(
      "Only admin can delete"
    );
  }

  const lead =
    await Lead.findById(id);

  if (!lead) {

    throw new Error(
      "Lead not found"
    );
  }

  await lead.deleteOne();

  return {
    message:
      "Lead deleted successfully",
  };
};


// ==========================
// ASSIGN LEAD
// ==========================
const assignLead = async (
  id,
  assignedTo,
  user
) => {

  // admin only
  if (user.role !== "admin") {

    throw new Error(
      "Only admin can assign"
    );
  }

  const lead =
    await Lead.findById(id);

  if (!lead) {

    throw new Error(
      "Lead not found"
    );
  }

  lead.assignedTo =
    assignedTo;

  await lead.save();

  return lead;
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