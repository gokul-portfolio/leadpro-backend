const Client = require(
  "./client.model"
);

const Lead = require(
  "../lead/lead.model"
);


// ==========================
// CREATE CLIENT
// ==========================
const createClient = async (
  data,
  user
) => {

  const client =
    await Client.create({
      ...data,
      createdBy: user.id,
    });

  return client;
};


// ==========================
// CONVERT LEAD TO CLIENT
// ==========================
const convertLeadToClient =
  async (
    leadId,
    user
  ) => {

    const lead =
      await Lead.findById(leadId);

    if (!lead) {
      throw new Error(
        "Lead not found"
      );
    }

    // create client
    const client =
      await Client.create({
        clientName:
          lead.clientName,

        companyName:
          lead.companyName,

        phone:
          lead.mobileNumber,

        email:
          lead.email,

        notes:
          lead.notes,

        convertedFromLead:
          lead._id,

        createdBy:
          user.id,
      });

    // update lead status
    lead.status = "closed";

    await lead.save();

    return client;
  };


// ==========================
// GET CLIENTS
// ==========================
const getClients = async () => {

  return await Client.find()
    .populate(
      "convertedFromLead",
      "clientName status"
    )
    .populate(
      "projects",
      "projectName status"
    )
    .populate(
      "createdBy",
      "name email"
    )
    .sort({
      createdAt: -1,
    });
};


// ==========================
// GET SINGLE CLIENT
// ==========================
const getSingleClient =
  async (id) => {

    const client =
      await Client.findById(id)
        .populate(
          "convertedFromLead"
        )
        .populate(
          "projects"
        )
        .populate(
          "createdBy",
          "name email"
        );

    if (!client) {
      throw new Error(
        "Client not found"
      );
    }

    return client;
  };


// ==========================
// UPDATE CLIENT
// ==========================
const updateClient =
  async (
    id,
    data
  ) => {

    const client =
      await Client.findById(id);

    if (!client) {
      throw new Error(
        "Client not found"
      );
    }

    // update fields
    Object.assign(
      client,
      data
    );

    await client.save();

    return client;
  };


// ==========================
// DELETE CLIENT
// ==========================
const deleteClient =
  async (id) => {

    const client =
      await Client.findById(id);

    if (!client) {
      throw new Error(
        "Client not found"
      );
    }

    await client.deleteOne();

    return {
      message:
        "Client deleted successfully",
    };
  };


module.exports = {
  createClient,
  convertLeadToClient,
  getClients,
  getSingleClient,
  updateClient,
  deleteClient,
};