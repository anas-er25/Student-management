const express = require("express");
const { index, create, store, show, edit, update, destroy, search } = require("../controllers/StudentController");
const StudentRouter = express.Router();

StudentRouter.get("/", index);
StudentRouter.get("/add", create);
StudentRouter.post("/store", store);
StudentRouter.get("/view/:id", show);
StudentRouter.get("/edit/:id", edit);
StudentRouter.put("/update/:id", update);
StudentRouter.delete("/delete/:id", destroy);
StudentRouter.post("/search", search);

module.exports = StudentRouter;
