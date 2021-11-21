import http from '../http-common';

class PlantDataService{
    getAll(page = 0){
        return http.get(`/plants?page=${page}`);
    }

    get(name) {
        console.log(`/plants/${name}`);
        return http.get(`/plants/${name}`);
    }

    find(query, page = 0) {
        return http.get(`/plants?${"name"}=${query}&page=${page}`);
    } 

    // createReview(data) {
    //     return http.post("/review-new", data);
    // }

    // deleteReview(id, userId) {
    //     return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
    // }
}

export default new PlantDataService();