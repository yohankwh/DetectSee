import http from '../http-common';

class PredictionDataService{
    getAll(page = 0){
        return http.get(`/predictions?page=${page}`);
    }

    get(id) {
        console.log(`/predictions/${id}`);
        return http.get(`/predictions/${id}`);
    }
    
}

export default new PredictionDataService();