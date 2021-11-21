import http from '../http-common';

class DiseaseDataService{
    // getAll(page = 0){
    //     return http.get(`/plants?page=${page}`);
    // }

    get(name) {
        console.log(`/diseases/${name}`);
        return http.get(`/diseases/${name}`);
    }

    find(query, page = 0) {
        return http.get(`/diseases?${"name"}=${query}&page=${page}`);
    } 

    // createReview(data) {
    //     return http.post("/review-new", data);
    // }

    // deleteReview(id, userId) {
    //     return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
    // }
}

export default new DiseaseDataService();