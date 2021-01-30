const handleTemperature = (req, res, db) => {
  const { city_id, max, min } = req.body;
  const timestamp = new Date().getTime();

  try {
    db("temperatures")
      .returning("*")
      .insert({
        city_id: city_id,
        max: max,
        min: min,
        timestamp: timestamp,
      })
      .then((resp) => {
        res.status(200).json({
          status: "success",
          data: resp[0],
          error: false,
          message: "Temperature created sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "Temperature could not be created",
      code: 413,
    });
  }
};

module.exports = {
  handleTemperature,
};
