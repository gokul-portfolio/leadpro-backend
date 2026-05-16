const clientService = require(
  "./client.service"
);


// ==========================
// CREATE CLIENT
// ==========================
const createClient =
  async (
    req,
    res,
    next
  ) => {

    try {

      const client =
        await clientService.createClient(
          req.body,
          req.user
        );

      res.status(201).json({
        success: true,
        message:
          "Client created successfully",
        data: client,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// CONVERT LEAD
// ==========================
const convertLeadToClient =
  async (
    req,
    res,
    next
  ) => {

    try {

      const client =
        await clientService.convertLeadToClient(
          req.params.leadId,
          req.user
        );

      res.status(201).json({
        success: true,
        message:
          "Lead converted successfully",
        data: client,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// GET CLIENTS
// ==========================
const getClients =
  async (
    req,
    res,
    next
  ) => {

    try {

      const clients =
        await clientService.getClients();

      res.status(200).json({
        success: true,
        count:
          clients.length,
        data: clients,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// GET SINGLE CLIENT
// ==========================
const getSingleClient =
  async (
    req,
    res,
    next
  ) => {

    try {

      const client =
        await clientService.getSingleClient(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: client,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// UPDATE CLIENT
// ==========================
const updateClient =
  async (
    req,
    res,
    next
  ) => {

    try {

      const client =
        await clientService.updateClient(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Client updated successfully",
        data: client,
      });

    } catch (err) {

      next(err);
    }
  };


// ==========================
// DELETE CLIENT
// ==========================
const deleteClient =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await clientService.deleteClient(
          req.params.id
        );

      res.status(200).json({
        success: true,
        ...result,
      });

    } catch (err) {

      next(err);
    }
  };


module.exports = {
  createClient,
  convertLeadToClient,
  getClients,
  getSingleClient,
  updateClient,
  deleteClient,
};