import express from "express";
import TodoModel from "../models/Todo";

const todosRouter = express.Router();

// Return all the TODOs from the database
todosRouter.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.send(todos);
  } catch (e) {
    console.log(e);

    res.statusCode = 500;
    res.send({
      status: "failed",
      message: "Seems like something is broken on our side",
    });
  }
});

// Update a TODO
todosRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: boolean };

    const todo = await TodoModel.findByIdAndUpdate(id, {
      isDone: status,
    });

    console.log(status);

    res.send({
      status: "success",
      message: "Successfully updated the todo.",
    });
  } catch (e) {
    console.log(e);

    res.statusCode = 500;
    res.send({
      status: "failed",
      message: "Seems like something is broken on our side",
    });
  }
});

// Delete a TODO from the database
todosRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: boolean };

    const todo = await TodoModel.findByIdAndDelete(id);

    console.log(status);

    res.send({
      status: "success",
      message: "Successfully deleted the todo.",
    });
  } catch (e) {
    console.log(e);

    res.statusCode = 500;
    res.send({
      status: "failed",
      message: "Seems like something is broken on our side",
    });
  }
});

todosRouter.post("/", async (req, res) => {
  try {
    const { title, body } = req.body as { title: string; body: string };

    const todo = new TodoModel({
      title,
      body,
    });

    await todo.save();

    res.send({
      status: "success",
      message: "Successfully stored TODO.",
    });
  } catch (e) {
    console.log(e);

    res.statusCode = 500;
    res.send({
      status: "failed",
      message: "Seems like something is broken on our side",
    });
  }
});

export default todosRouter;
