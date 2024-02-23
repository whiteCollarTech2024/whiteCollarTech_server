const UserModel = require("../../model/user.model")(require("../../db"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  loginService: async (serviceInputParams) => {
    try {
      const { email, password } = serviceInputParams;

      if (!email || !password) {
        return { status: 400, message: "Email and password are required" };
      }

      const user = await UserModel.findOne({
        where: { email: email },
      });

      if (!user) {
        return { status: 400, message: "User does not exist" };
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return { status: 400, message: "Invalid password" };
      }

      const token = jwt.sign(
        { id: user.userId, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        token: token,
        message: "user logged in successfully",
        user: {
          email: user.email,
          id: user.userId,
        },
      };
    } catch (serviceError) {
      console.log(
        "[DEBUG] User Service at loginService Error :-",
        serviceError
      );
      return { status: 500, message: "An error occurred" };
    }
  },

  signUpService: async (serviceInputParams) => {
    try {
      const { email, password } = serviceInputParams;

      if (!email || !password) {
        return { status: 400, message: "Email and password are required" };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [user, created] = await UserModel.findOrCreate({
        where: { email: email },
        defaults: { password: hashedPassword },
      });

      if (created) {
        const token = jwt.sign(
          { id: user.userId, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return {
          message: "user created successfully",
          token,
          user: {
            email: user.email,
            id: user.userId,
          },
        };
      } else {
        return {
          status: 400,
          message: "User already exists",
        };
      }
    } catch (serviceError) {
      console.log(
        "[DEBUG] User Service at signUpService Error :-",
        serviceError
      );

      return { status: 500, message: "An error occurred" };
    }
  },
};
