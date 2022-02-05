import express from 'express';
import DiseasesController from '../controller/diseasesController.js';
import PlantsController from '../controller/plantsController.js';
import ImagesController from '../controller/imagesController.js';

const router = express.Router();

router.route('/images/:id').get(ImagesController.getDiseaseImageById);

router.route('/diseases').get(DiseasesController.getDiseases);
router.route('/diseases/:name').get(DiseasesController.getDiseaseByParam);

router.route('/plants').get(PlantsController.getPlants);
router.route('/plants/:name').get(PlantsController.getPlantByParam);
export default router;