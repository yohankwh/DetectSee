import ImagesDAO from "../../dao/imageDiseasesDAO.js";

export default class ImagesController{
    static async getDiseaseImageById(req,res,next){
        try{
            let paramName = req.params.id || {};
            let images = await ImagesDAO.getDiseaseImagesById(paramName);
            if(!images){
                res.status(404).json({error:"Not found"});
                return;
            }
            res.json(images);
        
        }catch(err){
            console.log(`error fetching from param: ${err}`);
            res.status(500).json({error:err});
        }
    }
}