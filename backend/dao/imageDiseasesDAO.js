import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let images;


export default class ImagesDAO {
    static async injectDB(conn) {
      if (images) {
        return;
      }
      try {
        images = await conn.db(process.env.MAIN_NS).collection("plant_disease_images")
      } catch (e) {
        console.error(`Error establishing collection in diseasesDAO: ${e}`,);
      }
    }
  
    static async getDiseaseImagesById(param_id){
      let imgList = await images.find({"disease_id":ObjectId(param_id)});
      imgList = await imgList.limit(3).toArray();
      imgList = imgList.map(img => img.file_name);
      return imgList;
    }
  }