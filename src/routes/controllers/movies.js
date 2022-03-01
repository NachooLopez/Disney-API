const { Character, Movie, Genre } = require("../../db");

const getAllMovies = async (req, res) => {
  const { name, genre, order } = req.query;
  try {
    const query = { where: {}, attributes: ["image", "title", "creationDate"] };
    if (name) query.where.title = name;
    if (genre) {
      query.include = {
        model: Genre,
        through: { attributes: [] },
        where: { id: genre },
      };
    }
    if (order) {
      if (order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC")
        return res.status(400).json({ error: "Order must be 'ASC' or 'DESC'" });
      query.order = [["creationDate", order.toUpperCase()]];
    }
    console.log(query);
    if (!Object.keys(query.where).length) delete query.where;

    console.log(query);
    const movies = await Movie.findAll(query);

    return movies.length
      ? res.json(movies)
      : res.status(404).json({ error: "Movie not found" });
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Movie not found!" });
  }
};

const getOneMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({
      where: { id },
      attributes: ["id", "image", "title", "creationDate", "rating"],
      include: [
        {
          model: Character,
          through: { attributes: [] },
          attributes: ["name"],
        },
        { model: Genre, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!movie) return res.status(404).json({ error: "Movie not found!" });
    return res.json(movie);
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Movie not found" });
  }
};

const addMovie = async (req, res) => {
  const userId = req.user;
  const { genres } = req.body;
  try {
    console.log(req.user);
    const movie = await Movie.create({ ...req.body, userId });
    const genresFound = await Genre.findAll({ where: { name: genres } });
    await movie.addGenre(genresFound);
    const newMovie = await Movie.findOne({
      where: { id: movie.id },
      attributes: ["id", "title", "image", "creationDate", "rating"],
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    res.status(201).json(newMovie);
  } catch (e) {
    console.log(e);
  }
};

const updateMovie = async (req, res) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) return res.status(404).json({ error: "Movie not found!" });
    if (movie.userId !== userId)
      return res.status(401).json({ error: "You cannot modify this movie" });
    await movie.update(req.body);
    const updatedMovie = await Movie.findOne({
      where: { id },
      attributes: ["id", "image", "title", "creationDate", "rating"],
    });
    res.json(updatedMovie);
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(400).json({ error: "Movie not found!" });
  }
};

const deleteMovie = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({ where: { id } });
    if (!movie) return res.status(404).json({ error: "Movie not found!" });
    if (movie.userId !== userId)
      return res.status(401).json({ error: "You cannot delete this movie" });
    await movie.destroy();

    return res.status(204).end();
  } catch (e) {
    console.log(e);
    if (e.name === "SequelizeDatabaseError")
      return res.status(404).json({ error: "Movie not found!" });
  }
};

module.exports = {
  getAllMovies,
  getOneMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
