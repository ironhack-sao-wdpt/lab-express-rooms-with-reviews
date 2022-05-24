// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();
const UserModel = require("../models/User.model");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const userCreate = await UserModel.create(data);

    return res.status(201).json(userCreate);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to create new user" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const data = req.body;

    const userList = await UserModel.find(data);

    return res.status(201).json(userList);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to find the user list" });
  }
});

router.get("/profile/:_id", async (req, res) => {
  try {
    const { _id } = red.params;

    const specificUser = await UserModel.findOne({ _id }).populate("reviews");

    //populate() -> which lets you reference documents in other collections. Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.
    // estou olhando o UserModel, portando vou verificar quais os campos que tem esse modelo.
    // no model, procuro o campo que tem a REF! será esse que possui a referência a outra coleção.
    // o parâmetro que vou passar para o populate é o nome do campo do schema (nome da chave do objeto do schema) que contém a referência para a outra coleção - que contém a REF
    // ato de popular:

    return res.status(201).json(userCreate);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to create new user" });
  }
});

module.exports = router;
