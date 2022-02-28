const { Router } = require("express");
const { register, login } = require("./controllers/auth");

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: The user's email
 *        password:
 *          type: string
 *          description: The user's password
 *      example:
 *        email: "fake@email.com"
 *        password: "password"
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Users
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: User registration
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *
 *    responses:
 *      201:
 *        description: Registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Confirmation message
 *                email:
 *                  type: string
 *                  description: User email
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
 *
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: User login
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *
 *    responses:
 *      201:
 *        description: Logged in
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: User token.
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message.
 *
 */
router.post("/login", login);

module.exports = router;
