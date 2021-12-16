const express = require("express");
const router = express.Router();
const { Todo } = require("../models/index");
const barber = require("../auth/middleware/bearer");
router.get("/", barber, async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    next(new Error(JSON.stringify(error)))
  }
});
router.post("/", barber, async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    next(new Error(JSON.stringify(error)))
  }
});
router.put("/:id", barber, async (req, res, next) => {
  console.log(req.params.id);
  try {
    console.log(req.body);
    const newTodo = await Todo.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    next(new Error(JSON.stringify(error)))
  }
});
router.delete("/:id", barber, async (req, res, next) => {
  try {
    const newTodo = await Todo.destroy({ where: { id: req.params.id } });
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    next(new Error(JSON.stringify(error)))
  }
});
module.exports = router;
