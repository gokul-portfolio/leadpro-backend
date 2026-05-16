const mongoose = require("mongoose");


// ==========================
// CLIENT SCHEMA
// ==========================
const clientSchema =
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

      // PHONE
      phone: {
        type: String,
        required: true,
      },

      // EMAIL
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },

      // ADDRESS
      address: {
        type: String,
        trim: true,
      },

      // INDUSTRY
      industry: {
        type: String,
        trim: true,
      },

      // GST NUMBER
      gstNumber: {
        type: String,
        trim: true,
      },

      // WEBSITE
      website: {
        type: String,
        trim: true,
      },

      // STATUS
      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
          "VIP",
          "Blocked",
        ],
        default: "Active",
      },

      // LEAD REFERENCE
      convertedFromLead: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Lead",
      },

      // PROJECTS
      projects: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],

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
    },
    {
      timestamps: true,
    }
  );


// ==========================
// EXPORT MODEL
// ==========================
module.exports = mongoose.model(
  "Client",
  clientSchema
);