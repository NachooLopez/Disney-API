const { Router } = require("express");
const {
  getChars,
  getOneChar,
  addChar,
  updateChar,
  deleteChar,
} = require("./controllers/characters");
const authManagment = require("../utils/authManagment");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      required:
 *        - name
 *        - image
 *        - age
 *        - weight
 *        - history
 *        - title
 *      properties:
 *        name:
 *          type: string
 *          description: The character's name
 *        image:
 *          type: string
 *          description: Image URL
 *        age:
 *          type: integer
 *          description: The character's age
 *        weight:
 *          type: integer
 *          description: Character's weight
 *        history:
 *          type: string
 *          description: Character history along the movies.
 *        title:
 *          type: string
 *          description: Movie where they appeared.
 *      example:
 *        name: "Carlos"
 *        image: "image.jpg"
 *        age: 22
 *        weight: 70
 *        history: "he was born on feb 16th"
 *        title: "Esperando la carroza"
 *    CharacterArr:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Character name
 *          image:
 *            type: string
 *            description: Image URL
 *      example:
 *        - name: Carlos
 *          image: image.jpg
 *        - name: Nacho
 *          image: nachoImage.jpg
 */

/**
 * @swagger
 * tags:
 *  name: Character
 *  description: Characters
 */

/**
 * @swagger
 * /characters:
 *  get:
 *    summary: Returns a list of characters.
 *    tags:
 *      - Character
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Retrive characters by name
 *      - in: query
 *        name: age
 *        schema:
 *          type: integer
 *        description: Retrieve characters by age
 *      - in: query
 *        name: movies
 *        schema:
 *          type: string
 *        description: Retreive characteres by movie ID
 *    responses:
 *      200:
 *        description: Characters retreived.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/CharacterArr"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.get("/", authManagment, getChars);

/**
 * @swagger
 * /characters/{id}:
 *  get:
 *    summary: Retrieve character by ID.
 *    tags: [Character]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Character ID
 *    responses:
 *      200:
 *        description: Characters retreived.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Character"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.get("/:id", authManagment, getOneChar);

/**
 * @swagger
 * /characters:
 *  post:
 *    summary: Create new character
 *    tags: [Character]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Character"
 *    responses:
 *      201:
 *        description: Character created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Character"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.post("/", authManagment, addChar);

/**
 * @swagger
 * /characters/{id}:
 *  put:
 *    summary: Edit character properties
 *    tags: [Character]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Character ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Character"
 *    responses:
 *      200:
 *        description: Character updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Character"
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.put("/:id", authManagment, updateChar);

/**
 * @swagger
 * /characters/{id}:
 *  delete:
 *    summary: Deletes a character
 *    tags: [Character]
 *    security:
 *      bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: text
 *        description: Character ID
 *    responses:
 *      204:
 *        description: Character deleted
 *      403:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      404:
 *        $ref: "#/components/responses/NotFound"
 */
router.delete("/:id", authManagment, deleteChar);

module.exports = router;
