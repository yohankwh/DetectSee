import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const PredictionsList = props => {
  return (
    <>
        <div className="content-title mb-5">
            <h2>Histori Prediksi</h2>
        </div>
        <div className="content-main">
            <p>Menunjukan 10 hasil dari 100 prediksi.</p>
            <div className="mb-5">
                <div className="prev-preds container">
                    <div className="row">
                        <div className="col-sm-4 mb-5 d-flex ps-0 pe-3">
                            <a href="" className="normal-link shadow-sm border rounded w-100">
                                <div className="resp-card-img rounded">
                                    <img src="assets/example.jpg" className="rounded-top"/>
                                </div>
                                <div className="w-100 p-2">
                                    <div>
                                        <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                    </div>
                                    <span><small>21 November 2021, 15:30</small></span>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 mb-5 d-flex ps-0 pe-3">
                            <a href="" className="normal-link shadow-sm border rounded w-100">
                                <div className="resp-card-img rounded">
                                    <img src="assets/example.jpg" className="rounded-top"/>
                                </div>
                                <div className="w-100 p-2">
                                    <div>
                                        <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                    </div>
                                    <span><small>21 November 2021, 15:30</small></span>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 mb-5 d-flex ps-0 pe-3">
                            <a href="" className="normal-link shadow-sm border rounded w-100">
                                <div className="resp-card-img rounded">
                                    <img src="assets/example.jpg" className="rounded-top"/>
                                </div>
                                <div className="w-100 p-2">
                                    <div>
                                        <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                    </div>
                                    <span><small>21 November 2021, 15:30</small></span>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 mb-5 d-flex ps-0 pe-3">
                            <a href="" className="normal-link shadow-sm border rounded w-100">
                                <div className="resp-card-img rounded">
                                    <img src="assets/example.jpg" className="rounded-top"/>
                                </div>
                                <div className="w-100 p-2">
                                    <div>
                                        <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                    </div>
                                    <span><small>21 November 2021, 15:30</small></span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default PredictionsList;