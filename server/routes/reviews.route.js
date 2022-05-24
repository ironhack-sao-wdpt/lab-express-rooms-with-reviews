const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");

router.post("/review", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;

    const result = await ReviewModel.create(data);

    const updateResult = await RoomModel.findOneAndUpdate(
      { _id: data.roomId },
      { $push: { reviews: result._id } },
      { new: true, runValidators: true }
    );

    console.log(updateResult);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao registrar review" });
  }
});

router.get("/review/:roomId", isAuthenticated, async (req, res) => {
  try {
    const { roomId } = req.params;
    reviews = await ReviewModel.find({ roomId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao encontrar review" });
  }
});

router.patch("/review/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;

    const result = await ReviewModel.findOneAndUpdate(
      { _id, ownerId: req.user._id },
      { $set: data },
      { new: true, runValidators: true }
    );

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao encontrar review" });
  }
});

router.delete("/review/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = ReviewModel.deleteOne({ _id });

    const updateResult = await RoomModel.findOneAndUpdate(
      { _id: result.roomId, ownerId: req.user._id },
      { $unset: { reviews: result._id } },
      { new: true, runValidators: true }
    );
    return res.status(201).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao encontrar review" });
  }
});
module.exports = router;
