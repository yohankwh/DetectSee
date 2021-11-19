import PlantsDAO from "../../dao/plantsDAO.js";

import helper from './helpers/helper.js';

export default class PlantsController{
    static async getPlants(req, res, next){
        const plantsPerPage = req.query.plantsPerPage ? parseInt(plantsPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};

        if(req.query.name){
            filters.name = req.query.name;
        }

        const {plantsList, totalNumPlants} = await PlantsDAO.getPlants({filters, page, plantsPerPage});

        let response = {
            filters:filters,
            page:page,
            plants: plantsList,
            entries_per_page: plantsPerPage,
            total_results: totalNumPlants
        };

        res.json(response);
    }

    static async getPlantByParam(req, res, next){
        try{
            let paramName = req.params.name || {};
            let plant = await PlantsDAO.getPlantByParam(paramName);
            if(!plant){
                res.status(404).json({error:"Not found"});
                return;
            }
            let diseaseNames = await helper.parseDiseases(plant.diseases);
            plant.disease_names = diseaseNames;
            res.json(plant);
        
          }catch(err){
            console.log(`error fetching from param: ${err}`);
            res.status(500).json({error:err});
          }
    }
}