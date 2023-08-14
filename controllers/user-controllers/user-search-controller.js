import vehicleModel from "../../models/vehicleModel.js";

export const getSearchResults = async (req, res) => {
  try {
    const query = req.params.query;
    const filter = parseInt(req.params.filter);
    if (query) {
      const data = await vehicleModel.find({
        vehicleName: { $regex: query, $options: "i" },
      });
      let filteredData = [];
      switch (filter) {
        case 0:
          filteredData = data;
          break;
        case 1:
          filteredData = data.filter((item) => item.rate <= 500);
          break;
        case 2:
          filteredData = data.filter(
            (item) => item.rate > 500 && item.rate <= 600
          );
          break;
        case 3:
          filteredData = data.filter(
            (item) => item.rate > 600 && item.rate <= 700
          );
          break;
        case 4:
          filteredData = data.filter(
            (item) => item.rate > 700 && item.rate <= 800
          );
          break;
        case 5:
          filteredData = data.filter((item) => item.rate > 800);
          break;
        default:
          filteredData = data;
          break;
      }
      res
        .status(200)
        .json({
          status: 200,
          message: `Seach result for query ${query} for the given filter`,
          result: filteredData,
        });
    } else
      res
        .status(201)
        .json({ status: 404, message: "Error while retrieving serach query" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
