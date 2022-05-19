const router = require("express").Router();
const ReviewsModel = require("../models/Reviews.model");
const RoomModel = require("../models/Room.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Create
router.post("/room-create", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;
    const result = await RoomModel.create(data);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room registration failed" });
  }
});

// Read (list)
router.get("/rooms", isAuthenticated, async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);

    const rooms = await RoomModel.find()
      .skipe(page * limit)
      .limit(limit);

    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room searching failed" });
  }
});

// Read (detail)
router.get("/rooms/_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const room = await RoomModel.findOne({ _id }).populate("reviews");

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room searching failed" });
  }
});

// Update
router.patch("/rooms/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await RoomModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Room not found" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room editing failed" });
  }
});

// Delete
router.delete("/rooms/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await RoomModel.deleteOne({ _id });

    const reviewsResult = await ReviewsModel.deleteMany({ userId: _id });

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "Room not found" });
    }

    console.log("Room delete:", result);
    console.log("Reviews delete: reviewsResult");
    return res.status(200).json({});
    // PRECISA DELETAR TODOS OS REVIEWS TAMBEM
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Post deletion failed" });
  }
});

module.exports = router;
