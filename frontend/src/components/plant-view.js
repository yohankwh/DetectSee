import React, {useState, useEffect} from 'react';
import PlantDataService from '../services/plants';
import {Link} from 'react-router-dom';

const PlantView = props => {
    const [plant, setPlant] = useState(null);
    const [diseases, setDiseases] = useState([]);
    const [diseaseImgs, setDiseaseImgs] = useState([]);
    const plantName = props.match.params.id;

    useEffect(()=>{
        fetchPlantByName(plantName);
    }, []);
    
    const fetchPlantByName = (name) => {
        PlantDataService.get(name)
        .then(res => {
            setPlant(res.data);
            setDiseases(res.data.disease_names ? res.data.disease_names : []);
            const fetched = res.data.disease_names;
            const imgs = [];
            fetched.forEach((val, idx)=>{
                let img = "http://localhost:5000/uploads/diseases/"+res.data.name+"-"+val+"-1.jpg";
                img = img.replace(/\s/g, "_");
                imgs.push(img);
            });
            setDiseaseImgs(imgs);
        })
        .catch(err => console.log(err))
    };
  
    if(!plant){
        return (
            <div className="p-1">
                <h2>Tanaman tidak tersedia</h2>
                <p>Coba cek kembali URL yang anda kunjungi.</p>
            </div>
        );
    }
    else{
        return (
            <>
                <div className="content-title mb-5">
                    <h2>Tanaman {plant.name}</h2>
                    <span className="text-secondary">Tips merawat Tanaman {plant.name}</span>
                </div>
                <div className="content-main">
                    <div>
                        <div className="mb-4">
                            <h4 className="mb-3">Tips dalam merawat</h4>
                            <p>{plant.tips}</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="mb-3">Penyakit dan Hama Umum</h4>

                            <div className="prev-preds container">
                                <div className="row">
                                    {diseases.length>0 ? 
                                        diseases.map((disease, idx) => {
                                            return (
                                            <div key={idx} className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                                <Link to={"/diseases/"+disease} className="normal-link shadow-sm border rounded w-100">
                                                    <div className="resp-card-img rounded">
                                                        <img src={diseaseImgs[idx]} className="rounded-top"/>
                                                    </div>
                                                    <div className="w-100 p-2">
                                                        <div>
                                                            <p className="mb-0 prev-pred-title">{disease}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )})
                                    :
                                    <p className="text-secondary px-0"><i>Data penyakit tanaman belum tersedia.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PlantView;

