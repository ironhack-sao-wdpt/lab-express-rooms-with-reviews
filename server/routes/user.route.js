// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();
const UserModel = require("../models/User.model");
const RoomModel = require("../models/Room.model");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// crud - post -> creat a new user
router.post("/signup", async (req, res) => {
  try {
    // Extrai a senha em texto claro, que só vai servir para gerar o hash e depois nossa aplicação nunca mais vai ter conhecimento da senha original
    const { name, email, password } = req.body; //desestruturando o que preciso de dados

    //1. verificar se o email está cadastrado - no schema já pede o unique = true, então OK! Done.

    //2. gerar o salt e hashear (tipo específico de criptografia) a senha do usuário
    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt); // a senha - assim como todos os dados inseridos pelo user - está no body.
    //eu recebo a informação password, uso ela para gerar o hash, e no meu banco de dados eu vou inserir como passwordHash. Por isso eu mudei isso no schema.
    //na parte de front, no react, o form que for apresentado pro user precisa conter o nome da chave PASSWORD, para eu conseguir bater aqui e acessar esse dado.

    //3. armazenar os dados do usuário e somente a senha criptografada
    const userCreate = await UserModel.create({
      name,
      email,
      passwordHash: hash,
    });

    return res.status(201).json(userCreate);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to create new user" });
  }
});

// USER LOGIN

// crud - get -> list of all users
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

// crud - get -> list of a specific user
router.get("/profile/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const specificUser = await UserModel.findOne({ _id }).populate(
      "createdRooms"
    );

    //populate() -> which lets you reference documents in other collections. Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.
    // estou olhando o UserModel, portando vou verificar quais os campos que tem esse modelo.
    // no model, procuro o campo que tem a REF! será esse que possui a referência a outra coleção.
    // o parâmetro que vou passar para o populate é o nome do campo do schema (nome da chave do objeto do schema) que contém a referência para a outra coleção - que contém a REF
    // ato de popular: (CONTINUAR)

    return res.status(201).json(specificUser);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to find this user" });
  }
});

// crud - patch -> update/edit a profile
router.patch("/profileUpdate/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const data = req.body;

    const updateUserProfile = await UserModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updateUserProfile) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json(updateUserProfile);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "It was not possible to update the profile" });
  }
});

// crud - delete -> delete a profile
router.delete("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedUser = await UserModel.deleteOne({ _id });

    if (!deletedUser.deletedCount) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const roomFromThisUser = await RoomModel.deleteMany({ createdRooms: _id });

    console.log("USER DELETED => ", deletedUser);
    console.log("ROOMS DELETED => ", roomFromThisUser);

    return res.status(200).json({}); //objeto vazio por convenção da comunidade
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Não foi possível salvar o usuário" });
  }
});

module.exports = router;
