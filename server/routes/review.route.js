const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");

router.post("/review", async (req, res) => {
  try {
    const data = req.body;
    const result = await ReviewModel.create(data);
    const updateResult = await RoomModel.findOneAndUpdate(
      { _id: data.roomId },
      { $push: { reviews: result._id } },
      { new: true, runValidators: true }
    );

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao cadastrar review" });
  }
});

router.get("/review", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);

    const reviews = await ReviewModel.find()
      .skip(page * limit)
      .limit(limit);
    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao buscar review" });
  }
});

router.get("/review/:_id", async (req, res) => {
  try {
    let { _id } = req.params;

    const reviews = await ReviewModel.findOne({ _id });

    if (!reviews) {
      return res.status(404).json({ msg: "review não encontrada" });
    }

    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao buscar review" });
  }
});

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
      return res.status(404).json({ msg: "review não encontrada" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao editar review" });
  }
});

router.delete("/review/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await ReviewModel.deleteOne({ _id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "review não encontrada" });
    }
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao remover review" });
  }
});
module.exports = router;
