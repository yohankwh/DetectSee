import http from '../http-common';

class PredictionDataService{

    getSome(page = 0){
        return http.get(`/predictions?page=${page}&per_page=3`);
    }

    getAll(page = 0){
        return http.get(`/predictions?page=${page}`);
    }

    get(id) {
        console.log(`/predictions/${id}`);
        return http.get(`/predictions/${id}`);
    }
    
    post(predictionData){
        return http.post('/predictions', predictionData);
    }
}

export default new PredictionDataService();