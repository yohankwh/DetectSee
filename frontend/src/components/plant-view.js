import React, {useState, useEffect} from 'react';
import PlantDataService from '../services/plants';
import {Link} from 'react-router-dom';

const PlantView = props => {
    const [plant, setPlant] = useState(null);
    const [diseases, setDiseases] = useState([]);
    const plantName = props.match.params.id;

    useEffect(()=>{
        fetchPlantByName(plantName);
    }, []);
    
    const fetchPlantByName = (name) => {
        PlantDataService.get(name)
        .then(res => {
            console.log(res);
            setPlant(res.data.name);
            setDiseases(res.data.disease_names ? res.data.disease_names : []);
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
                    <h2>Tanaman {plant}</h2>
                    <span className="text-secondary">Tips merawat Tanaman {plant}</span>
                </div>
                <div className="content-main">
                    <div>
                        <div className="mb-4">
                            <h4 className="mb-3">Tips dalam merawat</h4>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, omnis fugit. Consequuntur, vel veritatis iure sequi maiores ea tempora dolorem debitis aspernatur ipsa quas magni repellat maxime odit reprehenderit facilis, dolores perferendis! Quod, vel necessitatibus?</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="mb-3">Penyakit dan Hama Umum</h4>

                            <div className="prev-preds container">
                                <div className="row">
                                    {diseases.length>0 ? 
                                        diseases.map((disease) => {
                                            return (
                                            <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                                <Link to={"/diseases/"+disease} className="normal-link shadow-sm border rounded w-100">
                                                    <div className="resp-card-img rounded">
                                                        <img src="./assets/example.jpg" className="rounded-top"/>
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

