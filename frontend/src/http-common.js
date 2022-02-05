import axios from 'axios';

//Wrapper for axios. Requests can be easier.
//e.g. http.get(<url_path>)
//NOT FOR MULTIPART REQUESTS
export default axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});