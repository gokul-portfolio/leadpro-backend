const mongoose = require("mongoose");


// ==========================
// PROJECT SCHEMA
// ==========================
const projectSchema =
  new mongoose.Schema(
    {
      // PROJECT NAME
      projectName: {
        type: String,
        required: true,
        trim: true,
      },

      // CLIENT NAME
      clientName: {
        type: String,
        required: true,
        trim: true,
      },

      // DESCRIPTION
      description: {
        type: String,
        trim: true,
      },

      // PROJECT STATUS
      status: {
        type: String,
        enum: [
          "Pending",
          "In Progress",
          "Testing",
          "Completed",
        ],
        default: "Pending",
      },

      // COMPLETION %
      completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      // START DATE
      startDate: {
        type: Date,
      },

      // DEADLINE
      deadline: {
        type: Date,
      },

      // PRIORITY
      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
          "Urgent",
        ],
        default: "Medium",
      },

      // ASSIGNED MEMBERS
      assignedMembers: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "User",
        },
      ],

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
// SEARCH INDEXES
// ==========================
projectSchema.index({
  projectName: "text",
  clientName: "text",
  description: "text",
  status: "text",
  priority: "text",
});


// ==========================
// EXPORT MODEL
// ==========================
module.exports = mongoose.model(
  "Project",
  projectSchema
);