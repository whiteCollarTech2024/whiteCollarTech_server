const JobApplicationModel = require("../../model/jobApplication.model")(
  require("../../db")
);
const { bucket } = require("../../firebase");

module.exports = {
  sendJobApplicationService: async (serviceInputParams) => {
    try {
      const {
        resumeFile,
        candidateFirstName = "",
        candidateLastName = "",
        candidateEmail = "",
        candidateNumber = "",
        jobId = "",
      } = serviceInputParams;

      if (!resumeFile) {
        return {
          message: "No resume was attached",
        };
      }

      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(resumeFile.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", async () => {
        const uploadedUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        const [url] = await blob.getSignedUrl({
          action: "read",
          expires: "03-17-3025",
        });

        await JobApplicationModel.create({
          candidateEmail,
          candidateFirstName,
          candidateLastName,
          candidateNumber,
          jobId,
          candidateResumeFilePath: url,
        });
      });

      blobStream.end(resumeFile.buffer);

      return {
        message: "Job application sent successfully",
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at sendJobApplicationService Error :-",
        serviceError
      );
      return { message: "An error occurred" };
    }
  },

  getJobApplicationsService: async (serviceInputParams) => {
    try {
      const { jobId } = serviceInputParams;

      const whereClause = { jobId: jobId };

      const date = await JobApplicationModel.findAll({ where: whereClause });

      return {
        data: date,
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at getJobApplicationsService Error :-",
        serviceError
      );
      return { message: "An error occurred" };
    }
  },

  rejectJobApplicationService: async (serviceInputParams) => {
    try {
      const { applicationId } = serviceInputParams;
      const whereClause = { id: applicationId };
      await JobApplicationModel.destroy({ where: whereClause });
      return { message: "Candidate application rejected" };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at rejectJobApplication Error :-",
        serviceError
      );
      return { message: "An error occurred" };
    }
  },
};
