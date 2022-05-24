const router = require("express").Router();
const RoomModel = require("../models/Room.model");
const ReviewModel = require("../models/Review.model");

//POST (create reviews for all the rooms but the ones they created*)
router.post("/review", async (req, res) => {
  try {
    const data = req.body;
    const result = await ReviewModel.create(data);

    // Atualizar usando autenticação*
    const updateResult = await RoomModel.findOneAndUpdate(
      { _id: data.roomId },
      { $push: { reviews: result._id } },
      { new: true, runValidators: true }
    );

    console.log("Review atualizado", updateResult);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao salvar o review" });
  }
});

//GET (see the list of the rooms and all the comments)
router.get("/room", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);
    const rooms = await RoomModel.find()
      .populate("reviews")
      .skip(page * limit)
      .limit(limit);
    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao buscar os locais" });
  }
});

//PATCH (edit their comments)
router.patch("/review/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;

    const result = await ReviewModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Review não encontrado" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao editar o review" });
  }
});

//DELETE (delete their comments)
router.delete("/review/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await ReviewModel.deleteOne({ _id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Local não encontrado" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao editar o local" });
  }
});

module.exports = router;
