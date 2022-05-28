// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();
const UserModel = require("../models/User.model");
const RoomModel = require("../models/Room.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");

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
      .json({ msg: "It was not possible to create a new user" });
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Verificar se o usuário já se cadastrou na nossa plataforma - filtrar se o email do usuário se encontra em nosso BD
    const user = await UserModel.findOne({ email });

    if (!user) {
      // 401: Unauthorized
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    // 2. Verificar se as senhas coincidem
    //bcrypt.compareSync() recebe dois argumentos: senha em texto claro e senha criptografada. retornar true (se as senhas batem) ou false (se as senhas não batem)
    //password que está no req.body e user.passwordHash do meu userModel. no momento que enviei o findOne(), o user já é o modelo de usuário (userModel) inteiro
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      // 401: Unauthorized
      // Por questões de segurança não informamos ao usuário se ele errou a senha ou o email para não ceder a informação de que o e-mail está correto para um potencial usuário malicioso que está tentando invadir uma conta
      return res.status(401).json({ msg: "Incorrect email or password" });
    }

    // 3. Assinar o token e enviá-lo como sucesso do login
    const token = generateToken(user);
    //respondo o sucesso do login:
    return res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Login not possible" });
  }
});

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
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.user; //pois foi modificado no isAuth. eu sei pelo token o id e infos do usuário

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
