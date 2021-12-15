const express = require("express");
const router = express.Router();
const { Todo } = require("../models/index");
const barber = require("../auth/middleware/bearer");
router.get("/", barber, async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
  }
});
router.post("/", barber, async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.put("/:id", barber, async (req, res) => {
  console.log(req.params.id);
  try {
    console.log(req.body);
    const newTodo = await Todo.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
  }
});
router.delete("/:id", barber, async (req, res) => {
  try {
    const newTodo = await Todo.destroy({ where: { id: req.params.id } });
    res.status(201).json(newTodo);
  } catch (error) {
    res.send(500).json(error);
  }
});
module.exports = router;
