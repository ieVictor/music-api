const installService = require("../services/installService");

class installController {
  static async install(req, res) {
    try {
      const data = await installService.installDatabase();
      res.status(200).json({ msg: "Database installed successfully", data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = installController;