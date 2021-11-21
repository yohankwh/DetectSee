import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PredictionDataService from '../services/predictions';

const PredictionsList = props => {
    const [predictions, setPredictions] = useState([]);
    
    useEffect(()=>{
        getPredictions();
    },[]);

    const getPredictions = () => {
        PredictionDataService.getAll()
        .then(response => {
            console.log(response.data);
            setPredictions(response.data);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    //NOTE: you can delete predictions, this can leave the array empty
    return (
        <>
            <div className="content-title mb-5">
                <h2>Histori Prediksi</h2>
            </div>
            { (predictions.predictions && predictions.predictions.length > 0) ? 
                <div className="content-main">
                    <p>Menunjukan {predictions.total_results} hasil prediksi.</p>
                    <div className="mb-5">
                        <div className="prev-preds container">
                            <div className="row">
                                {
                                    predictions.predictions.map((pred)=>{
                                        return(
                                            <div className="col-sm-4 mb-5 d-flex ps-0 pe-3">
                                                <Link to={"/history/"+pred._id} className="normal-link shadow-sm border rounded w-100">
                                                    <div className="resp-card-img rounded">
                                                        <img src="assets/example.jpg" className="rounded-top"/>
                                                    </div>
                                                    <div className="w-100 p-2">
                                                        <div>
                                                            <p className="mb-0 prev-pred-title">
                                                                {pred.plant_name+" "+pred.disease_name}
                                                            </p>
                                                        </div>
                                                        <span>
                                                            <small>
                                                                {new Date(pred.date).toLocaleString('id-ID',
                                                                { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                            </small>
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="content-main">
                    <p>Anda belum melakukan diagnosis, <Link to="/predict">diagnosis sekarang</Link>?</p>
                </div>
            }
            
        </>
    );
}

export default PredictionsList;