const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");

//Crud(create)
router.post("/room", async (req, res) => {
  try {
    //1. extrair as informações do corpo da requisição
    const data = req.body;

    //2. inserir informações no banco
    const result = await RoomModel.create(data);
    return res.status(201).json(result); // 201 = created

    //3. responder o resultado
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao cadastrar sala" });
  }
});

//cRud(read)
router.get("/room", async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);
    limit = Number(limit);

    const rooms = await RoomModel.find()
      .skip(page * limit)
      .limit(limit);
    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao buscar sala" });
  }
});

//cRud(read) - filtrado por id
router.get("/room/:_id", async (req, res) => {
  try {
    //extrai id URL
    let { _id } = req.params;

    //busca o documento com id
    const rooms = await RoomModel.findOne({ _id }).populate("reviews");

    //caso não exista retorna 404
    if (!rooms) {
      return res.status(404).json({ msg: "sala não encontrada" });
    }

    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao buscar sala" });
  }
});

//crUd(update)
router.patch("/room/:_id", async (req, res) => {
  try {
    //1. extrair id URL
    const { _id } = req.params;
    const data = req.body;

    //2. atualizar a sala com esse id, usando os dados do corpo da requisição
    const result = await RoomModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    //3. caso nenhum documento for encontrado, retorna 404
    if (!result) {
      return res.status(404).json({ msg: "sala não encontrada" });
    }
    //4. responde objeto atualizado
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao editar sala" });
  }
});

//cruD(delete)
router.delete("/room/:_id", async (req, res) => {
  try {
    //1. extrair id URL
    const { _id } = req.params;

    const result = await RoomModel.deleteOne({ _id });
    const reviewResult = await ReviewModel.deleteMany({ roomId: _id });

    console.log(reviewResult);

    if (result.deletedCount < 1) {
      return res.status(404).json({ msg: "sala não encontrada" });
    }
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "falha ao remover sala" });
  }
});

module.exports = router;
