import express from 'express';
import {
  AdoptedPet,
  DeletePet,
  filterPetsByMood,
  GetPet,
  PetsIndex,
  StorePet,
  UpdatePet,
} from '../controllers/pets.controller.js';

const router = express.Router();

/**
 * @swagger
 * /Pets:
 *   get:
 *     summary: Get all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: A list of pets
 */
router.get('/', PetsIndex);

/**
 * @swagger
 * /pets/filter:
 *   get:
 *     summary: Filter pets by mood
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: mood
 *         schema:
 *           type: string
 *         required: true
 *         description: Mood of the pet (e.g., happy, sad, playful)
 *     responses:
 *       200:
 *         description: List of pets matching the mood

 *       500:
 *         description: Server error
 */
router.get('/filter', filterPetsByMood);

/**
 * @swagger
 * /Pets/{id}:
 *   get:
 *     summary: Get a single pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the pet to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 species:
 *                   type: string
 *                 age:
 *                   type: number
 *                 personality:
 *                   type: string
 *       404:
 *         description: Pet not found
 */
router.get('/:id', GetPet);

/**
 * @swagger
 * /Pets:
 *   post:
 *     summary: Add a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - age
 *               - personality
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: number
 *               personality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet added
 */
router.post('/', StorePet);

/**
 * @swagger
 * /Pets/{id}:
 *   put:
 *     summary: Update a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - age
 *               - personality
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: number
 *               personality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet updated
 */
router.put('/:id', UpdatePet);

/**
 * @swagger
 * /Pets/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pet deleted
 */
router.delete('/:id', DeletePet);

/**
 * @swagger
 * /pets/{id}/adopt:
 *   patch:
 *     summary: Mark a pet as adopted
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pet to adopt
 *     responses:
 *       200:
 *         description: Pet adopted successfully
 *        

 *       500:
 *         description: Server error
 */
router.patch('/:id/adopt', AdoptedPet);

export default router;
