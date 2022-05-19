const router = require("express").Router();
const ReviewsModel = require("../models/Reviews.model");
const RoomModel = require("../models/Room.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Create review
router.post("/review-create", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;
    const result = await ReviewsModel.create(data);

    const updateResult = await RoomModel.findOneAndUpdate(
      { _id: data.roomId },
      { $push: { orders: result._id } },
      { new: true, runValidators: true }
    );

    console.log("Room updated: ", updateResult);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to post review" });
  }
});

// Update review
router.patch("/reviews/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await ReviewsModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Review not found" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Review editing faild" });
  }
});

// Delete review
// PRECISA FAZER A ATUALIZAÇAO DA ARRAY DE REVIWES NO ROOM
router.delete("/reviews/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await ReviewsModel.deleteOne({ _id });

    if (result.deleteCount < 1) {
      return res.status(404).json({ msg: "Review not found" });
    }
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Review deletion failed" });
  }
});

module.exports = router;
