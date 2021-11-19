import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let diseases;

export default class DiseasesDAO {
  static async injectDB(conn) {
    if (diseases) {
      return;
    }
    try {
      diseases = await conn.db(process.env.MAIN_NS).collection("diseases")
    } catch (e) {
      console.error(`Error establishing collection in diseasesDAO: ${e}`,);
    }
  }

  static async getDiseases({filters = null, page = 0, diseasesPerPage = 5} = {}){
    let query;

    if (filters) {
      if ("name" in filters) {
        query = {$text: {$search: filters["name"]}};
      }
    }

    let cursor;
    
    try {
      cursor = await diseases.find(query);

    } catch (e) {
      console.error(`Query Error, ${e}`);
      return {diseasesList: [], totalNumDiseases: 0};
    }

    const displayCursor = cursor.limit(diseasesPerPage).skip(diseasesPerPage * page);

    try {
      const diseasesList = await displayCursor.toArray();
      const totalNumDiseases = await diseases.countDocuments(query);

      return {diseasesList, totalNumDiseases};
    } catch (e) {
      console.error(`Error Array Conversion (Diseases), ${e}`,);
      return {diseasesList: [], totalNumDiseases: 0};
    }
  }

  //helper methods
  static async getDiseaseNameById(id){
    return await diseases.findOne({_id:ObjectId(id)});
  }
}