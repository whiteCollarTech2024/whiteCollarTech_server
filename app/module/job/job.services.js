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
        city = "",
        jobCategory = "",
      } = serviceInputParams;

      if (
        !title ||
        !jobDescription ||
        !rolesAndResponsibilities ||
        !qualifications ||
        !minYearExperience ||
        !maxYearExperience ||
        !jobType ||
        !city ||
        !jobCategory
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
          city,
          jobCategory,
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
      const {
        id,
        title,
        jobDescription,
        rolesAndResponsibilities,
        qualifications,
        minYearExperience,
        maxYearExperience,
        jobType,
        city,
        jobCategory,
      } = serviceInputParams;

      // Check if all required fields are provided
      if (
        !id ||
        !title ||
        !jobDescription ||
        !rolesAndResponsibilities ||
        !qualifications ||
        minYearExperience === undefined ||
        maxYearExperience === undefined ||
        !jobType ||
        !city ||
        !jobCategory
      ) {
        return {
          status: 400,
          message: "Missing information",
        };
      }

      // Update the job in the database
      const [updatedJobCount] = await JobModel.update(
        {
          title,
          jobDescription,
          rolesAndResponsibilities,
          qualifications,
          minYearExperience,
          maxYearExperience,
          jobType,
          city,
          jobCategory,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updatedJobCount === 0) {
        return {
          status: 404,
          message: "Job not found",
        };
      }

      return {
        status: 200,
        message: "Job updated successfully",
      };
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
      const { id } = serviceInputParams;
      await JobModel.destroy({ where: { id } });

      return { status: 200, message: "Job Deleted" };
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
      const { userId } = serviceInputParams;
      const whereClause = { userId };

      const jobsData = await JobModel.findAll({ whereClause });

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

  getAllCareersService: async (serviceInputParams) => {
    try {
      const { jobCategory } = serviceInputParams;

      let whereClause = {};
      if (jobCategory && jobCategory !== "All Positions") {
        whereClause = { jobCategory };
      }

      const jobsData = await JobModel.findAll({ where: whereClause });

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
      const { id, userId, jobCategory } = serviceInputParams;

      const whereClause = { userId, id };
      const jobData = await JobModel.findOne(whereClause);

      return {
        status: 200,
        data: jobData || {},
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at getJobByIdService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  getCareerByIdService: async (serviceInputParams) => {
    try {
      const { id } = serviceInputParams;
      const whereClause = { id };
      const jobData = await JobModel.findOne(whereClause);

      return {
        status: 200,
        data: jobData || {},
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at getJobByIdService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },
};
