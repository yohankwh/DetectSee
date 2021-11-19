import DiseasesDAO from "../../dao/diseasesDAO.js";

import helper from './helpers/helper.js';

export default class DiseasesController{
    static async getDiseases(req, res, next){
        const diseasesPerPage = req.query.diseasesPerPage ? parseInt(diseasesPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};

        if(req.query.name){
            filters.name = req.query.name;
        }

        const {diseasesList, totalNumDiseases} = await DiseasesDAO.getDiseases({filters, page, diseasesPerPage});

        let response = {
            filters:filters,
            page:page,
            diseases: diseasesList,
            entries_per_page: diseasesPerPage,
            total_results: totalNumDiseases
        };

        res.json(response);
    }

}