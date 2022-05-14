const router = require("express").Router();
const RoomModel = require("../models/Room.model");

//POST (create new rooms)
router.post("/room", async (req, res) => {
  try {
    const data = req.body;
    const result = await RoomModel.create(data);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Falha ao criar o local" });
  }
});

//GET (see the list of the rooms)
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
    return res.status(500).json({ msg: "Falha ao buscar os locais" });
  }
});

//PATCH (edit the room)
router.patch("/room/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const data = req.body;
    
        const result = await RoomModel.findOneAndUpdate(
          { _id },
          { $set: data },
          { new: true, runValidators: true }
        ); 
    
        if (!result) {
          return res.status(404).json({ msg: "Local não encontrado" });
        }
    
        return res.status(200).json(result);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Falha ao editar o local" });
      }
    });

//DELETE (delete the room)
router.delete("/room/:_id", async (req, res) => {
    try {
      
      const { _id } = req.params;
  
      const result = await RoomModel.deleteOne({ _id });
  
      if (result.deletedCount < 1) {
        return res.status(404).json({ msg: "Local não encontrado" });
      }
  
      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Falha ao editar o local" });
    }
  });

module.exports = router;
