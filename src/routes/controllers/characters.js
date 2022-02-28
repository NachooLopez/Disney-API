const { Character, Movie } = require("../../db");

const getChars = async (req, res) => {
  const { name, age, movies } = req.query;
  try {
    const query = { where: {}, attributes: ["name", "image"] };
    if (name) query.where.name = name;

    if (age) query.where.age = age;

    if (movies) {
      query.include = {
        model: Movie,
        through: { attributes: [] },
        where: { id: movies },
        attributes: ["title"],
      };
    }

    if (!Object.keys(query.where).length) delete query.where;

    const chars = await Character.findAll(query);

    return chars.length
      ? res.json(chars)
      : res.status(404).json({ error: "Character not found" });
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Character not found!" });
  }
};

const getOneChar = async (req, res) => {
  const { id } = req.params;
  try {
    const char = await Character.findOne({
      where: { id },
      attributes: ["id", "name", "image", "age", "weight", "history"],
      include: {
        model: Movie,
        through: { attributes: [] },
        attributes: ["title", "image", "creationDate"],
      },
    });
    if (char) return res.json(char);
    return res.status(404).json({ error: "Character not found!" });
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Character not found!" });
  }
};

const addChar = async (req, res) => {
  const userId = req.user;
  const { name, title } = req.body;
  try {
    const movie = await Movie.findOne({ where: { title } });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    const characterExists = await Character.findOne({
      where: { name },
      attributes: ["id", "name", "image", "age", "weight", "history"],
    });
    if (characterExists) {
      characterExists.addMovie(movie);
      return res.status(201).json(characterExists);
    }
    const char = await Character.create({
      ...req.body,
      userId,
    });

    char.addMovie(movie);

    const newChar = await Character.findOne({
      where: { id: char.id },
      attributes: { exclude: ["userId"] },
    });

    res.json(newChar);
  } catch (e) {
    console.log(e);
  }
};

const updateChar = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  try {
    const char = await Character.findOne({ where: { id } });
    if (!char) return res.status(404).json({ error: "Character not found!" });
    if (char.userId !== userId)
      return res
        .status(403)
        .json({ error: "You cannot change this character" });
    await char.update(req.body);

    const updatedChar = await Character.findOne({
      where: { id },
      attributes: { exclude: ["userId"] },
    });

    res.json(updatedChar);
  } catch (e) {
    console.log(e);
  }
};

const deleteChar = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  try {
    const char = await Character.findOne({ where: { id } });
    if (!char) return res.status(404).json({ error: "Character not found!" });
    if (char.userId !== userId)
      return res
        .status(403)
        .json({ error: "You cannot delete this character" });
    await char.destroy();

    res.status(204).end();
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Character not found!" });
  }
};

module.exports = { getChars, getOneChar, addChar, updateChar, deleteChar };
