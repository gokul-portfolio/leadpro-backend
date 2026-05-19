// ==================================================
// FOLLOW MODEL
// FILE: models/follow.model.js
// ==================================================

const mongoose = require("mongoose");

// ==================================================
// FOLLOW SCHEMA
// ==================================================

const followSchema = new mongoose.Schema(
  {
    // LEAD ID
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    // EMPLOYEE ID
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // CUSTOMER NAME
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    // COMPANY NAME
    companyName: {
      type: String,
      trim: true,
    },

    // PHONE NUMBER
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // EMAIL
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // FOLLOWUP DATE
    followupDate: {
      type: Date,
      required: true,
    },

    // FOLLOWUP TIME
    followupTime: {
      type: String,
      required: true,
    },

    // FOLLOWUP TYPE
    followupType: {
      type: String,
      enum: [
        "Call",
        "Meeting",
        "WhatsApp",
        "Email",
        "Demo",
      ],
      default: "Call",
    },

    // STATUS
    status: {
      type: String,
      enum: [
        "Pending",
        "Interested",
        "Not Interested",
        "Converted",
        "Callback Later",
      ],
      default: "Pending",
    },

    // PRIORITY
    priority: {
      type: String,
      enum: [
        "High",
        "Medium",
        "Low",
      ],
      default: "Medium",
    },

    // NOTES
    notes: {
      type: String,
      trim: true,
    },

    // NEXT FOLLOWUP DATE
    nextFollowupDate: {
      type: Date,
    },

    // COMPLETED STATUS
    isCompleted: {
      type: Boolean,
      default: false,
    },

    // COMPLETED DATE
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ==================================================
// SEARCH INDEX
// ==================================================

followSchema.index({
  customerName: "text",
  companyName: "text",
  phone: "text",
  email: "text",
  status: "text",
  priority: "text",
});

// ==================================================
// EXPORT MODEL
// ==================================================

module.exports = mongoose.model(
  "Follow",
  followSchema
);