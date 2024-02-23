const { loginService, signUpService } = require("./user.services");

module.exports = {
  loginController: async (req, res) => {
    try {
      const response = await loginService(req.body);

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] User Controller at loginController Error :-",
        controllerError
      );
      res.status(400).send({ message: controllerError.message });
    }
  },

  signUpController: async (req, res) => {
    try {
      const response = await signUpService(req.body);

      if (response.status === 400) {
        throw new Error(response.message);
      }

      res.send(response);
    } catch (controllerError) {
      console.log(
        "[DEBUG] User Controller at loginController Error :-",
        controllerError
      );

      res.status(400).send({ message: controllerError.message });
    }
  },
};
