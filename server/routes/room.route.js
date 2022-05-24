// importar o roteador do express + invocar a classe Router()
const router = require("express").Router();

// importar o room model
const RoomModel = require("../models/Room.model");

// configurar rotas da API

// - Crud (Creat - POST) -> creat new rooms
router.post("/room", async (req, res) => {
  try {
    //1. extrair as infos do corpo da requisição - tudo que o user preencher fica disponível pra gente no req.body
    const data = req.body;

    //2. inserir essas infos no BD
    // create() é uma operação assíncrona (tem que esperar para poder terminar), e preciso usar o then() ou o await . se quiser usar o await, preciso transformar a função em async + try/catch
    const result = await RoomModel.create(data);

    //3. responder o resultado positivo e de error
    // 201 significa 'created', ou seja, criado com sucesso o novo registro no banco
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    // 500 erro interno do servidor
    return res.status(500).json({ msg: "Fail to create new room" });
  }
});

// - Crud (Update - PATCH) -> // EDIT and delete the rooms
router.patch("/room/:_id", async (req, res) => {
  try {
    //1. extratir id da url
    const { _id } = req.params;

    const data = req.body;

    //2. atualizar room com esse id usando os dados do corpot da requisição
    const editedRoom = await RoomModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );
    // findOneAndUpdate recebe dois objetos, sendo
    //1) o filtro: no caso, vou filtrar pelo id, então eu indico somente o _id
    //2) segundo objeto é onde digo qual vai ser o tipo de atualização, ou seja, qual operador de atualização vou usar. E é onde eu digo o que vai ser atualizado
    // O operador set é usado quando queremos evitar que a substituição inteira do document aconteça, ou seja, quando queremos acrescentar e / ou alterar somente alguns campos no document, sem apagar todos os outros.
    // por último, eu passo um objeto de configuração com: a) new = true para ele retornar o objeto atualizado! e runValidators = true para que ele siga as regras do schema tbm na atualização

    //3. caso nenhum documento for encontrado, eu vou retornar o 404
    if (!editedRoom) {
      return res.status(404).json({ msg: "Room not found" });
    }
    //4. caso contrário, vou responder o objeto atualizado
    return res.status(200).json(editedRoom);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to edit room" });
  }
});

// - Crud (Delete - Delete) -> // edit and DELETE the rooms
router.delete("/room/:_id", async (req, res) => {
  try {
    //1. extrair o id da url
    const { _id } = req.params;

    const deletedRoom = await RoomModel.deleteOne({ _id });

    if (deletedRoom.deletedCount < 1) {
      return res.status(404).json({ msg: "Room not found" });
    }
    return res.status(200).json({}); //convenção do res é retornar o objeto vazio quando delete deu certo
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to delete room" });
  }
});

// - Crud (Read - GET) -> see the list of ALL the rooms
router.get("/room", async (req, res) => {
  try {
    // para trazer a lista de todos rooms (lista completa) eu passo o RoomModel sem parâmetro.

    // entretanto - se passo sem filtro algum, fica muito pesado para puxar quando são muito dados - ruim pro front

    // logo, utilizo paginação -> passo parâmetros de pesquisa: http://localhost:4000/room?page=0&limit=20

    let { page, limit } = req.query;

    page = Number(page);
    limit = Number(limit);

    // como fazer para a página andar de acordo com o limite? -> multiplica a página pelo limite
    const allRooms = await RoomModel.find()
      .skip(page * limit)
      .limit(limit);

    //se não tiver nada, vai voltar uma array vazia
    return res.status(200).json(allRooms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to get list of all rooms" });
  }
});

// - Crud (Read - GET) -> see A SPECIFIC room
router.get("/room/:_id", async (req, res) => {
  try {
    let { _id } = req.params;

    // procuro o room pelo id específico
    const oneRoom = await RoomModel.findOne({ _id });
    // primeiro _id é o campo do banco de dados que eu quero filtrar
    // segundo _id é o valor que está na minha URL - que puxei pelo req.params
    // funcionalidade da versão 6 do javascript, que não preciso passar o valor quando ele tem o mesmo nome. ntão fica: {_id}

    //pequeno tratamento de erro:
    // se não encontrar o que está procurando, retorna null, portanto preciso conferir isso pra retornar um status 404
    if (!oneRoom) {
      return res.status(404).json({ msg: "Room not found" });
    }

    return res.status(200).json(oneRoom);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Fail to get list of all rooms" });
  }
});

module.exports = router;
