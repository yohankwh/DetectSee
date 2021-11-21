import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PredictionDataService from '../services/predictions';

const PredictionView = props => {
    const [diagnosis, setDiagnosis] = useState(null);
    const diagnosisId = props.match.params.id;

    useEffect(()=>{
        getDiagnosis(diagnosisId)
        
    },[]);

    const getDiagnosis = (id) => {
        PredictionDataService.get(id)
        .then((fetched) => {
            console.log(fetched);
            setDiagnosis(fetched.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    if(!diagnosis){
        return(
            <div className="content-title mb-3">
                <h2 className="mb-1">Hasil Diagnosis</h2>
                <span className="text-secondary">Diagnosis ini tidak ditemukan!</span>
            </div>
        );
    }else{
        return (
            <>
                <div className="content-title mb-3">
                    <h2 className="mb-1">Hasil Diagnosis</h2>
                    <span className="text-secondary"><small>prediction_id: <em>{diagnosis._id}</em></small></span>
                </div>
                <div className="content-main">
                    <div>
                        <div className="prev-preds container">
                            <div className="row">
                                <div className="col-sm-8 mb-4 d-flex ps-0 pe-3">
                                    <div className="normal-link w-100">
                                        <div className="single-pred-img rounded">
                                            <img src="assets/example.jpg" className="rounded-top"/>
                                        </div>
                                        <div className="w-100 p-2">
                                            <span>
                                                <small>Tanggal Diagnosis: {new Date(diagnosis.date).toLocaleString('id-ID',
                                                       { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </small>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="predictions">
                                <ol className="ps-3">
                                    <li>
                                        <div className="prediction-item mb-5 border-bottom">
                                            <h4 className=""><a href="">{diagnosis.plant_name}</a> <a href="">{diagnosis.disease_name}</a></h4>
                                            <p>Confidence: {parseInt(parseFloat(diagnosis.confidence)*100)+"%"}</p>
                                            <div className="pt-3 mb-2">
                                                <h5>Gejala</h5>
                                                <ul className="ps-3">
                                                    <li>Deez</li>
                                                    <li>Nuts</li>
                                                </ul>
                                            </div>
                                            <p><a href="">Lihat Halaman Hama</a></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="prediction-item mb-5">
                                            <h4 className=""><a href="">Kacang Panjang</a> <a href="">Hama Tulis</a></h4>
                                            <p>Confidence: 80%</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <a href="" className="btn btn-danger">Hapus Diagnosis</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PredictionView;
