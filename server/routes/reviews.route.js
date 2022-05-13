const router = require("express").Router();
const ReviewsModel = require("../models/Reviews.model");

// Create review
// a rota do review tem que estar ligada com a rota do room?
router.post("/review-create", async (req, res) => {
  try {
    const data = req.body;
    const result = await ReviewsModel.create(data);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to post review" });
  }
});

// Read list of reviews
router.get("/reviews", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);

    const reviwes = await ReviewsModel.find()
      .skipe(page * limit)
      .limit(limit);

    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Review searching faild" });
  }
});

// Update review
router.patch("/reviews/:_id", async (req, res) => {
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
router.delete("/reviews/:_id", async (req, res) => {
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
