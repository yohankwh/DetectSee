class ModelList{
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
                classNames = ["Hama Pengorok Daun","Penyakit Embun Bulu","Sehat"]
                break;
            case "Tomat":
                classNames = ["Hama Pengorok Daun","Sehat"];
                break;
            default:
                break;
        }
        return classNames;
    }
}
export default new ModelList();