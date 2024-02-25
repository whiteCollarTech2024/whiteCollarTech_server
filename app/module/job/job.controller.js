const {
  addJobService,
  editJobService,
  deleteJobService,
  getAllJobsService,
  getJobByIdService,
  getAllCareersService,
  getCareerByIdService,
} = require("./job.services");

module.exports = {
  addJob: async (req, res) => {
    try {
      const response = await addJobService({
        ...req.body,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log("[DEBUG] Job Controller at addJob Error :-", controllerError);
      res.status(400).send({ message: controllerError.message });
    }
  },

  editJob: async (req, res) => {
    try {
      const response = await editJobService({
        ...req.body,
        ...req.params,
        ...req.query,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at editJob Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const response = await deleteJobService({ ...req.body, ...req.params });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at deleteJob Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      const response = await getAllJobsService({
        ...req.body,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at getAllJobs Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  getAllCareers: async (req, res) => {
    try {
      const response = await getAllCareersService({
        ...req.query,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at getAllJobs Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  getJobById: async (req, res) => {
    try {
      const response = await getJobByIdService({
        ...req.query,
        ...req.params,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at getJobById Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  getCareerById: async (req, res) => {
    try {
      const response = await getCareerByIdService({
        ...req.query,
        ...req.params,
        userId: req.userId,
      });

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at getJobById Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },
};
