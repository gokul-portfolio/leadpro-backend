const mongoose = require("mongoose");


// ==========================
// LEAD SCHEMA
// ==========================
const leadSchema =
  new mongoose.Schema(
    {
      // CLIENT NAME
      clientName: {
        type: String,
        required: true,
        trim: true,
      },

      // COMPANY NAME
      companyName: {
        type: String,
        trim: true,
      },

      // MOBILE NUMBER
      mobileNumber: {
        type: String,
        required: true,
        trim: true,
      },

      // EMAIL
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },

      // SERVICE REQUIRED
      serviceRequired: {
        type: String,
        required: true,
        trim: true,
      },

      // BUDGET
      budget: {
        type: Number,
        default: 0,
      },

      // LEAD SOURCE
      leadSource: {
        type: String,
        enum: [
          "website",
          "facebook",
          "instagram",
          "linkedin",
          "reference",
          "cold_call",
          "other",
        ],
        default: "website",
      },

      // LEAD STATUS
      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "followup",
          "qualified",
          "closed",
          "rejected",
        ],
        default: "new",
      },

      // NOTES
      notes: {
        type: String,
        trim: true,
      },

      // CREATED BY
      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // ASSIGNED USER
      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );


// ==========================
// INDEXES
// SEARCH PERFORMANCE
// ==========================
leadSchema.index({
  clientName: "text",
  companyName: "text",
  email: "text",
  mobileNumber: "text",
  serviceRequired: "text",
});


// ==========================
// EXPORT MODEL
// ==========================
module.exports = mongoose.model(
  "Lead",
  leadSchema
);