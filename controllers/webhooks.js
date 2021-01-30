const handleTemperature = (req, res, db) => {
  const { city_id, callback_url } = req.body;

  try {
    db("webhooks")
      .returning("*")
      .insert({
        city_id: city_id,
        callback_url: callback_url,
      })
      .then((resp) => {
        res.status(200).json({
          status: "success",
          data: resp[0],
          error: false,
          message: "webhook created sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "webhook could not be created",
      code: 413,
    });
  }
};

const handleDeleteWebhook = (req, res, db) => {
  const id = req.params.id;

  try {
    db("cities")
      .where({ id: id })
      .del()
      .then((resp) => {
        res.status(200).json({
          status: "success",
          error: false,
          message: "Webhook deleted sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "Webhook could not be deleted",
      code: 413,
    });
  }
};
