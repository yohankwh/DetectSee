import PlantsDAO from "../../../dao/plantsDAO.js";
import DiseasesDAO from "../../../dao/diseasesDAO.js";

//option 1: pake file .json
//option 2: import dari DB

export default class Helper{
    static async parsePredictions(predictionList){//predictionList is array of object
        for(const pred of predictionList){
            const disease_name = await DiseasesDAO.getDiseaseNameById(String(pred.disease_id));
            const plant_name = await PlantsDAO.getPlantNameById(String(pred.plant_id));
            pred.disease_name = disease_name.name;
            pred.plant_name = plant_name.name;
        }
        
        return predictionList;
    }

    static async parseDiseases(diseaseList){
        const disease_list = [];
        for(const disease of diseaseList){
            console.log(disease);
            const name = await DiseasesDAO.getDiseaseNameById(String(disease));
            disease_list.push(name.name);
        }

        return disease_list;
    }

    static async parsePlants(plantList){
        const plant_list = [];
        for(const plant of plantList){
            const name = await PlantsDAO.getPlantNameById(String(plant._id));
            plant_list.push(name.name);
        }

        return disease_list;
    }

    static async getIdForPredByName(plant_name, disease_name){
        console.log("PLANT: "+plant_name+"\nDISEASE: "+disease_name);
        const plantId = await PlantsDAO.getPlantIdByName(plant_name);
        console.log("JADI IDNYA INI: "+plantId);
        const diseaseId = await DiseasesDAO.getDiseaseIdByName(disease_name);

        return {"plant_id":plantId, "disease_id":diseaseId};
    }

    static async getDiSeaseImagesById(plant_id, disease_id){
        
    }
}