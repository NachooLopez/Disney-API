const { Router } = require("express");
const authManagment = require("../utils/authManagment");
const {
  getAllMovies,
  getOneMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("./controllers/movies");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      required: [title, image, creationDate, rating]
 *      properties:
 *        title:
 *          type: string
 *          description: Movie's title
 *        image:
 *          type: string
 *          description: Image URL.
 *        creationDate:
 *          type: string
 *          description: Creation date of the movie (MM-DD-YYYY)
 *        rating:
 *          type: number
 *          minimum: 1
 *          maximum: 5
 *          description: Movie's rating
 *        genres:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Genres names
 *      example:
 *        title: "Esperando la carroza"
 *        image: "carroza.jpg"
 *        creationDate: "10-10-2010"
 *        rating: 3
 *        genres: [{name: Comedy}, {name: Action}]
 *    MovieInput:
 *      type: object
 *      required: [title, image, creationDate, rating]
 *      properties:
 *        title:
 *          type: string
 *          description: Movie's title
 *        image:
 *          type: string
 *          description: Image URL.
 *        creationDate:
 *          type: string
 *          description: Creation date of the movie (MM-DD-YYYY)
 *        rating:
 *          type: number
 *          minimum: 1
 *          maximum: 5
 *          description: Movie's rating
 *        genres:
 *          type: array
 *          items:
 *            type: string
 *            description: Genres names
 *      example:
 *        title: "Esperando la carroza"
 *        image: "carroza.jpg"
 *        creationDate: "10-10-2010"
 *        rating: 3
 *        genres: ["Action", "Comedy"]
 *    MovieArr:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          image:
 *            type: string
 *            description: Image URL
 *          title:
 *            type: string
 *            description: Movie title
 *          creationDate:
 *            type: string
 *            description: Movie creation date (MM-DD-YYYY)
 *      example:
 *        - image: "carroza.jpg"
 *          title: "Esperando la carroza"
 *          creationDate: "02-26-2000"
 *        - image: "frozen.jpg"
 *          title: "Frozen"
 *          creationDate: "11-22-2013"
 */

/**
 * @swagger
 * tags:
 *  name: Movie
 *  description: Movies
 */

/**
 * @swagger
 * /movies:
 *  get:
 *    summary: Retrieve the movies
 *    tags: [Movie]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *        description: Find by movie title
 *      - in: query
 *        name: genre
 *        schema:
 *          type: string
 *        description: Find by genre
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *        description: Sort by creation date
 *    responses:
 *      200:
 *        description: Movies retrieved
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/MovieArr"
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 *
 *
 */
router.get("/", authManagment, getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    summary: Retrieve a single movie by ID
 *    tags: [Movie]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Movie ID
 *    responses:
 *      200:
 *        description: Movie retrieved
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Movie"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 *
 */
router.get("/:id", authManagment, getOneMovie);

/**
 * @swagger
 * /movies:
 *  post:
 *    summary: Create a new movie
 *    tags: [Movie]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/MovieInput"
 *    responses:
 *      201:
 *        description: Movie created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Movie"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.post("/", authManagment, addMovie);

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: Update a movie
 *    tags: [Movie]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: text
 *        description: Movie ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Movie"
 *    responses:
 *      200:
 *        description: Movie updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Movie"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.put("/:id", authManagment, updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    summary: Delete a movie
 *    tags: [Movie]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: text
 *        description: Movie ID
 *    responses:
 *      204:
 *        description: Movie deleted
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.delete("/:id", authManagment, deleteMovie);

module.exports = router;
