import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let predictions;

export default class PredictionsDAO{
  static async injectDB(conn) {
    if (predictions) {
      return;
    }
    try {
        predictions = await conn.db(process.env.MAIN_NS).collection("predictions")
    } catch (e) {
      console.error(`Error establishing collection in predictionsDAO: ${e}`,);
    }
  }
  
  static async getPredictions({page = 0, predictionsPerPage = 5} = {}){
    let cursor;
    
    try {
      cursor = await predictions.find();
    } catch (e) {
      console.error(`Cannot Fetch Predictions, ${e}`);
      return {predictionsList: [], totalNumPredictions: 0};
    }

    const displayCursor = cursor.limit(predictionsPerPage).skip(predictionsPerPage * page);

    try {
      const predictionsList = await displayCursor.toArray();
      const totalNumPredictions = await predictions.countDocuments(cursor);

      return {predictionsList, totalNumPredictions};
    } catch (e) {
      console.error(`Error Array Conversion (Predictions), ${e}`,);
      return {predictionsList: [], totalNumPredictions: 0};
    }
  }

  static async addPrediction(plantId, diseaseId, confidence, imageUrl, date){
    try{
      const predictionDoc = {
        plant_id: ObjectId(plantId),
        disease_id: ObjectId(diseaseId),
        confidence: confidence,
        image_url: imageUrl,
        date: date
      }

      return await predictions.insertOne(predictionDoc);
    }catch(err){
      console.error(`Error saving prediction result: ${err}`);
      return {error: err};
    }
  }

  static async deletePrediction(predictionId){
    try{
      const deletePrediction = await predictions.deleteOne({_id: ObjectId(predictionId)});
      return deletePrediction;
    }catch(err){
      console.log(`Error deleting prediction: ${err}`);
      return {error:err};
    }
  }

  static async getPredictionById(predictionId){
    try{
      const prediction = predictions.findOne({_id:ObjectId(predictionId)});
      if(!prediction){
        return;
      }
      return prediction;

    }catch(err){
      console.log(`Error Fetching Disease by ID: ${err}`);
      throw err;
    }
  }
}