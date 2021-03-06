import PredictionsDAO from "../../dao/predictionsDAO.js";

import helper from './helpers/helper.js';

export default class PredictionsController{
    static async getPredictions(req, res, next){
        const predictionsPerPage = req.query.per_page ? parseInt(req.query.per_page, 10) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        const {predictionsList, totalNumPredictions} = await PredictionsDAO.getPredictions({page, predictionsPerPage});

        let parsedPrediction = await helper.parsePredictions(predictionsList);

        let response = {
            page:page,
            predictions: parsedPrediction,
            entries_per_page: predictionsPerPage,
            total_results: totalNumPredictions
        };

        res.json(response);
    }

    static async postPrediction(req,res,next){
        try{
            const plantName = req.body.plant_name;
            const diseaseName = req.body.disease_name;

            const {plant_id, disease_id} = await helper.getIdForPredByName(plantName, diseaseName);
            // console.log("MATCH: "+plantName+" : "+plant_id);
            // console.log("MATCH THIS: "+diseaseName+" : "+disease_id);

            const confidence = req.body.confidence;
            const image_plant = req.file.path;
            
            const date = new Date();

            const PredictionsResponse = await PredictionsDAO.addPrediction(
                plant_id,
                disease_id,
                confidence,
                image_plant,
                date
            )

            // console.log(PredictionsResponse);

            res.json({status:"success",inserted_id:PredictionsResponse.insertedId});
        }catch(err){
            console.log(err);
            res.status(500).json({error:err.message});
        }
    }

    static async deletePrediction(req, res, next){
        try{
            const predictionId = req.query.id;
            const reviewResponse = await PredictionsDAO.deletePrediction(predictionId);

            res.json({status:"success"});
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

    static async getPredictionById(req,res,next){
        try{
            let paramName = req.params.id || {};
            let prediction = await PredictionsDAO.getPredictionById(paramName);
            if(!prediction){
                res.status(404).json({error:"Not found"});
                return;
            }
            let parsedPrediction = await helper.parsePredictions([prediction]);
            res.json(parsedPrediction[0]);
        
        }catch(err){
            console.log(`error fetching from param: ${err}`);
            res.status(500).json({error:err});
        }
    }
}