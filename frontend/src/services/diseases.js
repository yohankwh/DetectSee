import http from '../http-common';

class DiseaseDataService{
    get(name) {
        return http.get(`/diseases/${name}`);
    }

    find(query, page = 0) {
        return http.get(`/diseases?${"name"}=${query}&page=${page}`);
    } 
}

export default new DiseaseDataService();