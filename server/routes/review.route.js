const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
router.post("/review", isAuthenticated, async (req, res) => {
  try {
    const data = req.body;

    if (req.body.roomId === "627e839684ee8ee440ba9f36") {
      return res
        .status(403)
        .json({ msg: "voce nao pode fazer review do seu proprio quarto" });
    }

    if (!(await RoomModel.findOne({ _id: req.body.roomId }))) {
      return res
        .status(403)
        .json({ msg: "voce nao pode criar review de um quarto inexistente" });
    }

    const result = await ReviewModel.create(data);

    // insere o id da review criada no campo reviews do modelo room
    const room = await RoomModel.findOneAndUpdate(
      { _id: req.body.roomId },
      { $push: { reviews: result._id } }
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falha ao cadastrar quarto" });
  }
});

router.get("/review", isAuthenticated, async (req, res) => {
  try {
    const rooms = await ReviewModel.find()
      .populate("roomId")
      .populate("createdBy");
    // const rooms = await RoomModel.find().populate("reviews");

    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "falha ao buscar quartos" });
  }
});

router.patch("/review/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await ReviewModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "a review nao foi encontrada" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao editar review" });
  }
});

router.delete("/review/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    // armazena os valores do  elemento deletado
    const result = await ReviewModel.findOneAndDelete({ _id });

    // deleta a referencia do review deletado no campo 'reviews' do  modelo Room
    const room = await RoomModel.updateOne(
      { _id: result.roomId },
      { $pull: { reviews: result._id } }
    );

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
