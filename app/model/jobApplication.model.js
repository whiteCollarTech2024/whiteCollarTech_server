const Sequelize = require("sequelize");
const sequelize = require("../db");
const { v4: uuidv4 } = require("uuid");

module.exports = () => {
  const JobApplication = sequelize.define("JobApplication", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },

    jobId: {
      type: Sequelize.UUID,
      allowNull: false,
    },

    candidateFirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    candidateLastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    candidateEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    candidateNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    candidateResumeFilePath: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  JobApplication.associate = (model) => {
    JobApplication.belongTo(model.Job, {
      foreignKey: "jobId",
      as: "job",
    });
  };

  return JobApplication;
};
