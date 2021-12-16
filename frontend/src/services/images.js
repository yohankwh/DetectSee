import http from '../http-common';

class ImageDataService{
    getDiseaseImgs(id) {
        console.log(id);
        return http.get(`/images/${id}`);
    }
}

export default new ImageDataService();