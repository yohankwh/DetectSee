import express from 'express';
import DiseasesController from '../controller/diseasesController.js';
import PlantsController from '../controller/plantsController.js';
import PredictionsController from '../controller/predictionsController.js';

const router = express.Router();

router.route('/diseases').get(DiseasesController.getDiseases);
router.route('/diseases/:name').get(DiseasesController.getDiseaseByParam);

router.route('/plants').get(PlantsController.getPlants);
router.route('/plants/:name').get(PlantsController.getPlantByParam);

router.route('/predictions').get(PredictionsController.getPredictions)
                 .post(PredictionsController.postPrediction)
                 .delete(PredictionsController.deletePrediction);

router.route('/predictions/:id').get(PredictionsController.getPredictionById);

export default router;