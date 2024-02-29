const Student = require("../models/StudentModel");
const mongoose = require("mongoose");

async function index(req, res) {
  const locals = {
    title: "Gestion des étudiants",
    description: "Gestion des étudiants en node js",
  };

  const perPage = 10;
  const page = parseInt(req.query.page) || 1;

  try {
    const totalStudentsCount = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudentsCount / perPage);

    const students = await Student.aggregate([
      { $sort: { updated_at: -1 } },
      { $skip: perPage * (page - 1) },
      { $limit: perPage },
    ]).exec();

    res.render("index", {
      locals,
      students,
      totalPages,
      currentPage: page,
      perPage,
      totalStudentsCount,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function create(req, res) {
  const locals = {
    title: "Ajouter un etudiant",
    description: "Ajouter un etudiant en node js",
  };
  res.render("students/add", locals);
}

async function store(req, res) {
  console.log(req.body);
  const newStudent = new Student({
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    email: req.body.email,
  });
  try {
    await Student.create(newStudent);

    // await req.flash("message", "L'étudiant créé avec succès");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

show = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const locals = {
      title: "Afficher un etudiant",
      description: "Afficher un etudiant en node js",
    };
    res.render("students/view", { locals, student });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

edit = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const locals = {
      title: "Modifier un etudiant",
      description: "Modifier un etudiant en node js",
    };
    res.render("students/edit", { locals, student });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

async function update(req, res) {
  const id = req.params.id;
  const updatedStudent = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    age: req.body.age,
    email: req.body.email,
    updated_at: Date.now(),
  };
  try {
    await Student.findByIdAndUpdate(id, updatedStudent);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

destroy = async (req, res) => {
  const id = req.params.id;

  try {
    await Student.findOneAndDelete({ _id: id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

search = async (req, res) => {
  let searchterm = req.body.searchterm;
  const specialchar = searchterm.replace(/[^a-zA-Z0-9 ]/g, "");

  const locals = {
    title: "Rechercher un etudiant",
    description: "Rechercher un etudiant en node js",
  };

  try {
    const students = await Student.find({
      $or: [
        {
          nom: { $regex: new RegExp(specialchar, "i") },
          prenom: { $regex: new RegExp(specialchar, "i") },
        },
      ],
    });
    res.render("search", { locals, students });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update,
  destroy,
  search,
};
