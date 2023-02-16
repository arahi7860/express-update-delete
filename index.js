import express from "express";
import mongoose from "mongoose";
import List from "./models/list.js";
const app = express();

// CRUD & REST

// Read   -> GET
// Create -> POST
// Update -> PATCH/PUT
// Delete -> DELETE

function tryCastId(id) {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    return null;
  }
}

app.use(express.json());

import "./seed.js";

app.get("/", (request, response) => {
  response.send("Hello, World!");
});

app.get("/list", async (request, response) => {
  const list = await List.find();
  response.json(list);
});

app.post("/list", async (request, response) => {
  const { name, items } = request.body;
  if (name && items) {
    const filteredItems = items
      .filter((item) => item.title !== undefined)
      .map((item) => {
        return {
          title: item.title,
          status: item.status || false,
        };
      });

    const createdList = await List.create({
      name,
      items: filteredItems,
    });
    response.json(createdList);
    return;
  }

  response.status(400).send("https://http.cat/400");
});

app.get("/list/:id", async (request, response) => {
  const id = tryCastId(request.params.id);

  const list = await List.findById(id);
  if (list !== null) {
    response.json(list);
    return;
  }

  response.status(404).json({
    message: "list by that Id was not found",
    url: "https://http.cat/404",
  });
});

app.delete("/list/:id", async (request, response) => {
  const id = tryCastId(request.params.id);
  const deletedList = await List.findByIdAndDelete(id);
  if (deletedList) {
    response.json(deletedList);
    return;
  }

  response.status(404).json({
    message: "list by that Id was not found",
    url: "https://http.cat/404",
  });
});

app.patch("/list/:id", async (request, response) => {
  const id = tryCastId(request.params.id);
  const { name, items } = request.body;
  const updateItem = { name, items };
  const updatedList = await List.findByIdAndUpdate(id, updateItem, {
    new: true,
  });
  if (updatedList) {
    response.json(updatedList);
    return;
  }

  response.status(404).json({
    message: "list by that Id was not found",
    url: "https://http.cat/404",
  });
});

app.listen(8080, () => {
  console.log("Server started at http://localhost:8080");
});
