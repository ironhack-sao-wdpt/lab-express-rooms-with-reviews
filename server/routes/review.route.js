// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");

// Crud - post -> Make reviews for all the rooms --> but the ones they created <--
router.post("/review", async (req, res) => {
  try {
    const data = req.body;
    //insere a nova review no BD
    const createReview = await ReviewModel.create(data);

    // agora é necessário atualizar a array de referências de reviews do room
    const updateReviewsArrRef = await RoomModel.findOneAndUpdate(
      // parâmetros: 1) filtro: o que quero filtrar por para então atualizar
      // 2) o que que eu quero atualizar? Utilizo o operador push e indico qual campo quero dar o push (atualizar em si).
      // após os dois pontos, indico o que eu quero adicionar de novo que neste caso é o id que foi criado pelo createReview
      { _id: data.roomId },
      { $push: { reviews: createReview._id } },
      // objeto de configuração para informar que quero ver o objeto já atualizado
      { new: true, runValidators: true }
    );

    //COMO FAZER PARA USER NÃO POSTAR REVIEW DO QUARTO DELE? como montar esse if???

    console.log("Updated Room ->", updateReviewsArrRef);

    return res.status(201).json(createReview);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to post your review" });
  }
});

//Crud PATCH -> Edit their comments (optional)
router.patch("/review/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const editedReview = await ReviewModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!editedReview) {
      return res.status(404).json({ msg: "This review was not found" });
    }

    return res.status(200).json(editedReview);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to edit you review" });
  }
});

//Crud Delete -> Delete their comments (optional)

//COMO ATUALIZAR  A ARR DE REF nos rooms AQUI DO DELETE??

router.delete("/review/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedReview = await ReviewModel.deleteOne({ _id });

    if (deletedReview.deletedCount < 1) {
      return res.status(404).json({ msg: "This review was not found" });
    }
    return res.status(200).json({}); //convenção do res é retornar o objeto vazio quando delete deu certo
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to delete room" });
  }
});

//CRUD - GET -> See the rooms and all the comments
router.get("/review", async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = Number(page);
    limit = Number(limit);

    const reviewsList = await ReviewModel.find()
      .skip(page * limit)
      .limit(limit)
      .populate("roomId");
    return res.status(200).json(reviewsList);
  } catch (err) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "It was not possible to find rooms and reviews" });
  }
});

module.exports = router;

//Make reviews for all the rooms but the ones they created
//Edit and/or delete their comments (optional)
//See the rooms and all the comments
