const handleForcast = (req, res, db) => {
  const id = req.params.id;

  try {
    db.select("*")
      .from("temperatures")
      .where({ id: id })
      .then((resp) => {
        res.status(200).json({
          status: "success",
          data: resp,
          error: false,
          message: "Forcast retrieved sucessfully",
          code: 200,
        });
      });
  } catch (e) {
    res.status().json({
      status: "failed",
      error: true,
      message: "Forcast could not be retrieved",
      code: 413,
    });
  }
};
