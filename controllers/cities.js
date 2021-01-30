const handleCreate = (req, res, db) => {
  const { name, latitude, longitude } = req.body;
  try {
    db.select("*")
      .from("cities")
      .where({ name: name })
      .then((city) => {
        if (city.length) {
          res.json({
            status: "failed",
            error: true,
            message: "City already exists",
            code: 413,
          });
        } else {
          db("cities")
            .returning("*")
            .insert({
              name: name,
              latitude: latitude,
              longitude: longitude,
            })
            .then((resp) => {
              res.status(200).json({
                status: "success",
                data: resp[0],
                error: false,
                message: "City created sucessfully",
                code: 200,
              });
            });
        }
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "City could not be created",
      code: 413,
    });
  }
};

const handleUpdate = (req, res, db) => {
  const id = req.params.id;
  const { name, latitude, longitude } = req.body;
  try {
    db("cities")
      .where("id", id)
      .returning("*")
      .update({
        name: name,
        latitude: latitude,
        longitude: longitude,
      })
      .then((resp) => {
        res.status(200).json({
          status: "success",
          data: resp[0],
          error: false,
          message: "City updated sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "City could not be updated",
      code: 413,
    });
  }
};

const handleDelete = (req, res, db) => {
  const id = req.params.id;
  try {
    db("cities")
      .where({ id: id })
      .del()
      .then((resp) => {
        res.status(200).json({
          status: "success",
          error: false,
          message: "City deleted sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status(401).json({
      status: "failed",
      error: true,
      message: "City could not be deleted",
      code: 413,
    });
  }
};

module.exports = {
  handleCreate,
  handleUpdate,
  handleDelete,
};
