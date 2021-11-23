class ModelList{
    getModelLists(){
        const models = []
    }

    getClassNamesByPlant(plant_name){
        let classNames;
        switch(plant_name) {
            case "Kacang Panjang":
              classNames = ["Sehat","Hama Pengorok Daun"];
              break;
            case "Cabai":
              // code block
              break;
            case "Timun":
                // code block
                break;
            case "Tomat":
                classNames = ["Hama Pengorok Daun","Sehat"];
                // code block
                break;
            default:
                break;
        }
        return classNames;
    }
}
export default new ModelList();