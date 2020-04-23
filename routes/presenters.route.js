const express = require("express");
const router = express.Router();
router.use(express.json());

let presentersList = [];
let govtechiesList = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

router.post("/", (req, res, next) => {
  govtechiesList = req.govtechiesList;
  if (govtechiesList.length === 0) res.status(200).json([]);
  else {
    const maxID = govtechiesList[govtechiesList.length - 1].id;
    let selectedpresenterID = 0;
    let presenter = null;
    let generatedNum = [];
    let foundPresenter = false;
    while (!foundPresenter) {
      selectedpresenterID = getRandomInt(maxID);
      if (!generatedNum.find((id) => id === selectedpresenterID)) {
        generatedNum.push(selectedpresenterID);
      } else if (generatedNum.length === maxID) {
        generatedNum = [];
        presentersList = [];
        generatedNum.push(selectedpresenterID);
      }
      if (
        !presentersList.find(({ id }) => id === selectedpresenterID) &&
        govtechiesList.find(({ id }) => id === selectedpresenterID)
      ) {
        foundPresenter = true;
        presenter = govtechiesList.find(({ id }) => id === selectedpresenterID);
        presentersList.push(presenter);
      }
    }
    res.status(200).json(presenter);
  }

  router.get("/", (req, res, next) => {
    res.status(200).json(presentersList);
  });
});

module.exports = router;
