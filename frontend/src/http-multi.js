import axios from 'axios';

//Wrapper for axios for MultiPart Request.
//e.g. http.get(<url_path>)
export default axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "multipart/form-data"
    }
});