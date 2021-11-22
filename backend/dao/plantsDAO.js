import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let plants;

export default class PlantsDAO {
  static async injectDB(conn) {
    if (plants) {
      return;
    }
    try {
      plants = await conn.db(process.env.MAIN_NS).collection("plants")
    } catch (e) {
      console.error(`Error establishing collection in plantsDAO: ${e}`,);
    }
  }

  static async getPlants({filters = null, page = 0, plantsPerPage = 5} = {}){
    let query;

    if (filters) {
      if ("name" in filters) {
        query = {$text: {$search: filters["name"]}};
      }
    }

    let cursor;
    
    try {
      cursor = await plants.find(query);
    } catch (e) {
      console.error(`Query Error, ${e}`);
      return {plantsList: [], totalNumPlants: 0};
    }

    const displayCursor = cursor.limit(plantsPerPage).skip(plantsPerPage * page);

    try {
      const plantsList = await displayCursor.toArray();
      const totalNumPlants = await plants.countDocuments(query);

      return {plantsList, totalNumPlants};
    } catch (e) {
      console.error(`Error Array Conversion (Plants), ${e}`,);
      return {plantsList: [], totalNumPlants: 0};
    }
  }

  static async getPlantByParam(paramName){
    try{
      const plant = plants.findOne({"name":paramName});
      if(!plant){
        return;
      }
      return plant;

    }catch(err){
      console.log(`Error Fetching Plant by ID: ${err}`);
      throw error;
    }
  }

  //helper methods
  static async getPlantNameById(id){
    return await plants.findOne({_id:ObjectId(id)});
  }

  static async getPlantIdByName(name){
    console.log("Plant name: "+name);
    const fetched = await plants.findOne({"name":name});
    console.log("FETCHED NAME:"+fetched.name+" "+fetched._id);
    return fetched._id;
  }

}