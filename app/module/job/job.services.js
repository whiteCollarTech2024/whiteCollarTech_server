const JobModel = require("../../model/job.model")(require("../../db"));

module.exports = {
  addJobService: async (serviceInputParams) => {
    try {
      const {
        title = "",
        jobDescription = "",
        rolesAndResponsibilities = "",
        qualifications = "",
        minYearExperience = "",
        maxYearExperience = "",
        jobType = "",
      } = serviceInputParams;

      if (
        !title ||
        !jobDescription ||
        !rolesAndResponsibilities ||
        !qualifications ||
        !minYearExperience ||
        !maxYearExperience ||
        !jobType
      ) {
        return {
          status: 400,
          message: "missing information",
        };
      } else {
        const newJob = await JobModel.create({
          title,
          jobDescription,
          rolesAndResponsibilities,
          qualifications,
          minYearExperience,
          maxYearExperience,
          jobType,
        });

        return { status: 201, data: newJob };
      }
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at addJobService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  editJobService: async (serviceInputParams) => {
    try {
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at editJobService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  deleteJobService: async (serviceInputParams) => {
    try {
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at deleteJobService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  getAllJobsService: async (serviceInputParams) => {
    try {
      console.log("serviceInputParams", serviceInputParams);
      const { userId } = serviceInputParams;
      const whereClause = { userId };

      const jobsData = await JobModel.findAll({
        whereClause,
        includes: "user",
      });

      return {
        status: 200,
        data: jobsData,
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at getAllJobsService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  getJobByIdService: async (serviceInputParams) => {
    try {
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at getJobByIdService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },
};
