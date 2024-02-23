const Sequelize = require("sequelize");
const sequelize = require("../db");
const { v4: uuidv4 } = require("uuid");

module.exports = () => {
  const Job = sequelize.define("Job", {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    jobDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    rolesAndResponsibilities: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    qualifications: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    minYearExperience: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },

    maxYearExperience: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },

    // job type enum :- FULLTIME, PARTTIME, FREELANCE

    jobType: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    title: {
      type: Sequelize.STRING,
    },
  });

  Job.associate = (model) => {
    Job.belongTo(model.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Job;
};
