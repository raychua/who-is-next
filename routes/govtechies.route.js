const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();

const presentersRouter = require("./presenters.route");

const govtechiesList = [];

router.use(express.json());
router.use(
  "/presenters",
  (req, res, next) => {
    req.govtechiesList = govtechiesList;
    next();
  },
  presentersRouter
);

const checkJSON = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Please send a json message");
  } else next();
};

router.param("id", (req, res, next, id) => {
  const govtechieID = parseInt(id);
  let newGovtechie = {};
  newGovtechie.id = govtechieID;
  newGovtechie.name = req.body.name;
  req.newGovtechie = newGovtechie;
  next();
});

function validateGovTechie(govtechie) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(govtechie);
}

router.get("/", (req, res) => {
  res.status(200).json(govtechiesList);
});

router.post("/", checkJSON, (req, res, next) => {
  const validation = validateGovTechie(req.body);
  if (validation.error) {
    const error = new Error(validation.error.details[0].message);
    error.statusCode = 404;
    next(error);
  } else {
    let govtechie = {};
    if (govtechiesList.length === 0) govtechie.id = 1;
    else govtechie.id = govtechiesList[govtechiesList.length - 1].id + 1;
    govtechie.name = req.body.name;
    govtechiesList.push(govtechie);
    res.status(201).json(govtechie);
  }
});

router.get("/:id", (req, res, next) => {
  console.log("in get id" + req.newGovtechie);
  const presenters = req.presenters;
  console.log(presenters);
  const searchgovtechie = req.newGovtechie;
  let found = false;
  govtechiesList.forEach((govtechie) => {
    if (govtechie.id === searchgovtechie.id) {
      res.status(200).json(govtechie);
      console.log("found");
      found = true;
    }
  });
  if (!found) {
    const error = new Error("Govtechie ID not found");
    error.statusCode = 404;
    next(error);
  }
});

router.put("/:id", checkJSON, (req, res, next) => {
  const newGovtechie = req.newGovtechie;
  let found = false;
  govtechiesList.forEach((govtechie, index) => {
    if (govtechie.id == newGovtechie.id) {
      govtechiesList.splice(index, 1, newGovtechie);
      res.status(200).json(newGovtechie);
      found = true;
    }
  });
  if (!found) {
    const error = new Error("Govtechie ID not found");
    error.statusCode = 404;
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  const newGovtechie = req.newGovtechie;
  let found = false;
  govtechiesList.forEach((govtechie, index) => {
    if (govtechie.id == newGovtechie.id) {
      govtechiesList.splice(index, 1);
      res.status(200).json(govtechie);
      found = true;
    }
  });
  if (!found) {
    const error = new Error("Govtechie ID not found");
    error.statusCode = 404;
    next(error);
  }
});

module.exports = router;
