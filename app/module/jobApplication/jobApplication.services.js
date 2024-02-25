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

      // Step  1: Create a job application record and retrieve its ID
      const jobApplication = await JobApplicationModel.create({
        candidateEmail,
        candidateFirstName,
        candidateLastName,
        candidateNumber,
        jobId,
        // Initially, set candidateResumeFilePath to null or an empty string
        candidateResumeFilePath: "",
      });

      const jobApplicationId = jobApplication.id;

      // Step  2: Use the job application ID to name the file in Firebase Storage
      const blob = bucket.file(
        `${jobApplicationId}/${resumeFile.originalname}`
      );
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", async () => {
        // Generate a download URL for the uploaded file
        const [downloadUrl] = await blob.getSignedUrl({
          action: "read",
          expires: "03-17-3025",
        });

        // Step   3: Update the candidateResumeFilePath of the job application record with the download URL
        await JobApplicationModel.update(
          {
            candidateResumeFilePath: downloadUrl,
          },
          {
            where: { id: jobApplicationId },
          }
        );

        return {
          message: "Job application sent successfully",
        };
      });

      blobStream.end(resumeFile.buffer);
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

      // Step  1: Retrieve the job application record
      const jobApplication = await JobApplicationModel.findOne({
        where: whereClause,
      });

      if (!jobApplication) {
        return { message: "Job application not found" };
      }

      // Step  2: Extract the folder name from the candidateResumeFilePath
      const folderName = jobApplication.candidateResumeFilePath.split("/")[4];

      // Step  3: Delete the folder and its contents from Firebase Storage
      const folderPath = `${folderName}/`;
      const [files] = await bucket.getFiles({ prefix: folderPath });

      await Promise.all(files.map((file) => file.delete()));

      // Step  4: Destroy the job application record
      await JobApplicationModel.destroy({ where: whereClause });

      return { message: "Candidate application rejected and files deleted" };
    } catch (serviceError) {
      console.log(
        "[DEBUG] Job Service at rejectJobApplication Error :-",
        serviceError
      );
      return { message: "An error occurred" };
    }
  },
};
