const router = require("express").Router();
const RoomModel = require("../models/Room.model");
const ReviewModel = require("../models/Review.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/room", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;

    const result = await RoomModel.create(data);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falha ao cadastrar quarto" });
  }
});

router.get("/room", isAuthenticated, async (req, res) => {
  try {
    const rooms = await RoomModel.find().populate("reviews");

    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falha ao buscar quartos" });
  }
});

router.get("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const room = await RoomModel.findOne({ _id }).populate({
      path: "reviews",
      populate: { path: "createdBy" },
    });

    if (!room) {
      return res.status(404).json({ mgs: "quarto nao encontrado" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falha ao encontrar quarto" });
  }
});

router.patch("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await RoomModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "quarto nao encontrado" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao editar quarto" });
  }
});

router.delete("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await RoomModel.deleteOne({ _id });
    const reviewsResult = await ReviewModel.deleteMany({ roomId: _id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "quarto nao encontrado" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao excluir quarto" });
  }
});

module.exports = router;
