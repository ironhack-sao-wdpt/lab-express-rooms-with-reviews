const router = require("express").Router();
const RoomModel = require("../models/Room.model");
const ReviewModel = require("../models/Review.model");

router.post("/room", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;
    const result = await RoomModel.create(data);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao cadastrar o quarto" });
  }
});

router.get("/room", isAuthenticated, async (req, res) => {
  try {
    const rooms = await RoomModel.find();

    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao buscar os quartos" });
  }
});

router.get("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const room = await RoomModel.findOne({ _id }).populate("reviews");

    if (!room) {
      return res.status(404).json({ msg: "Quarto não encontrado" });
    }

    return res.status(202).json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao buscar o quarto" });
  }
});

router.patch("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;

    const result = await RoomModel.findOneAndUpdate(
      { _id, ownerId: req.user._id },
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ msg: "Quarto não encontrado" });
    }

    return res.status(202).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao editar o quarto" });
  }
});

router.delete("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await RoomModel.deleteOne({ _id, ownerId: req.user._id });

    const reviewResult = await ReviewModel.deleteMany({ roomId: _id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Quarto não encontrado" });
    }

    console.log(reviewResult);
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao deletar o quarto" });
  }
});

module.exports = router;
