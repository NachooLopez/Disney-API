const { Router } = require("express");
const auth = require("./auth");
const characters = require("./characters");
const movies = require("./movies");

const router = Router();

router.use("/auth", auth);
router.use("/characters", characters);
router.use("/movies", movies);

module.exports = router;
