import express from 'express';
import DiseasesController from '../controller/diseasesController.js';
import PlantsController from '../controller/plantsController.js';
import PredictionsController from '../controller/predictionsController.js';
import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, 'uploads');
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().getTime()+'-'+file.originalname);
    }
})

const upload = multer({storage:fileStorage});

const router = express.Router();

router.route('/diseases').get(DiseasesController.getDiseases);
router.route('/diseases/:name').get(DiseasesController.getDiseaseByParam);

router.route('/plants').get(PlantsController.getPlants);
router.route('/plants/:name').get(PlantsController.getPlantByParam);

router.route('/predictions').get(PredictionsController.getPredictions)
                 .post(upload.single('image_plant'),PredictionsController.postPrediction)
                 .delete(PredictionsController.deletePrediction);

router.route('/predictions/:id').get(PredictionsController.getPredictionById);

export default router;