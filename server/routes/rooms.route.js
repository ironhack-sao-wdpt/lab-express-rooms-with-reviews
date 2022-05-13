const router = require("express").Router();
const RoomModel = require("../models/Room.model");

// Create
router.post("/room-create", async (req, res) => {
  try {
    const data = req.body;
    const result = await RoomModel.create(data);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room registration faild" });
  }
});

// Read (list)
router.get("/rooms", async (req, res) => {
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
    return res.status(500).json({ msg: "Room searching faild" });
  }
});

// Read (detail)
router.get("/rooms/_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const room = await RoomModel.findOne({ _id });

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Room searching faild" });
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
    return res.status(500).json({ msg: "Room editing faild" });
  }
});

// Delete
router.delete("/rooms/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await RoomModel.deleteOne({ _id });

    if (result.deleteCount < 1) {
      return res.status(404).json({ msg: "Room not found" });
    }
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Post deletion failed" });
  }
});

module.exports = router;
