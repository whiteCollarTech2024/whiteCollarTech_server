const {
  getJobApplicationsService,
  sendJobApplicationService,
  rejectJobApplicationService,
} = require("./jobApplication.services");

module.exports = {
  sendJobApplicationController: async (req, res) => {
    try {
      const response = await sendJobApplicationService({
        ...req.body,
        resumeFile: req.file,
      });

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at sendJobApplicationController Error :-",
        controllerError
      );
      res.status(400).send({ message: controllerError.message });
    }
  },

  getJobApplicationsController: async (req, res) => {
    try {
      const response = await getJobApplicationsService({
        ...req.query,
      });

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at getJobApplicationsController Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },

  rejectJobApplicationController: async (req, res) => {
    try {
      const response = await rejectJobApplicationService({
        ...req.query,
        ...req.params,
      });

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] Job Controller at rejectJobApplicationController Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },
};
