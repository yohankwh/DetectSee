import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PredictionDataService from '../services/predictions';

const Home = props => {
    const [recentPredictions, setRecentPredictions] = useState([]);

    useEffect(()=>{
        loadRecentPredicitions();
    },[]);

    const loadRecentPredicitions = () => {
        PredictionDataService.getSome()
        .then((fetched)=>{
            setRecentPredictions(fetched.data.predictions)
            console.log(fetched);
        })
        .catch((err)=>{
            console.log(err);
        });

    }

    return (
        <div>
            <div className="content-title mb-5">
                <h2>Deteksi Hama dari Foto Tanaman</h2>
                <span className="text-secondary">Upload Foto Tanaman dan Deteksi Hama atau Penyakit</span>
            </div>
            <div className="content-main">
                <div className="mb-5">
                    <h4 className="mb-3">Diagnosis tanaman dengan mudah.</h4>
                    <div className="bg-steps steps-col p-2 rounded pb-3">
                        <div className="container d-flex justify-content-center mb-3">
                            <div className="col-3 py-3">
                                <p className="mb-2 text-center weight-500">1</p>
                                <div className="d-flex justify-content-center steps-photo mb-2">
                                    <img src="./assets/takephoto.png" alt="capture-icon"/>
                                </div>
                                <p className="text-center mb-0 steps-desc">Ambil Gambar</p>
                            </div>
                            <div className="col-3 mx-3 py-3">
                                <p className="mb-2 text-center weight-500">2</p>
                                <div className="d-flex justify-content-center steps-photo mb-2">
                                    <img src="./assets/analysis.png" alt="analysis-icon"/>
                                </div>
                                <p className="text-center mb-0 steps-desc">Dapatkan Diagnosis</p>
                            </div>
                            <div className="col-3 py-3">
                                <p className="mb-2 text-center weight-500">3</p>
                                <div className="d-flex justify-content-center steps-photo mb-2">
                                    <img src="./assets/results.png" alt="get-results"/>
                                </div>
                                <p className="text-center mb-0 steps-desc">Dapatkan Penanganan</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/predict" className="btn border rounded primary-green-btn weight-500">
                                Ambil Gambar
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="d-flex justify-content-between mb-3">
                        <h4 className="">Diagnosis Sebelumnya</h4>
                        <Link to="/history" className="weight-500" style={{textDecoration:"none"}}>
                            <p>Lihat semua</p>
                        </Link>
                    </div>
                    <div className="prev-preds container">
                        <div className="row">
                            {recentPredictions && recentPredictions.length > 0 ?
                                recentPredictions.map((pred) => {
                                    return (
                                        <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                            <Link to={"/history/"+pred._id} className="normal-link shadow-sm border rounded w-100">
                                                <div className="resp-card-img rounded">
                                                    <img src="assets/example.jpg" className="rounded-top" alt="predicted image"/>
                                                </div>
                                                <div className="w-100 p-2">
                                                    <div>
                                                        <p className="mb-0 prev-pred-title">{pred.plant_name} {pred.disease_name}</p>
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
                                    )}
                                )
                                :
                                <p className="text-secondary">
                                    Belum ada diagnosis, <Link to="/predict">buat sekarang</Link>?
                                </p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
