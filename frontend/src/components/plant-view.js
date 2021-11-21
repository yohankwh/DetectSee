import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const PlantView = props => {
  return (
    <>
        <div className="content-title mb-5">
            <h2>Tanaman Cabai</h2>
            <span className="text-secondary">Tips merawat Tanaman Cabai</span>
        </div>
        <div className="content-main">
            <div>
                <div className="mb-4">
                    <h4>Tips dalam merawat Cabai</h4>
                    <p className="text-secondary">Berikut penyakit dan hama yang umum menyerang tanaman NAMA TANAMAN</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, omnis fugit. Consequuntur, vel veritatis iure sequi maiores ea tempora dolorem debitis aspernatur ipsa quas magni repellat maxime odit reprehenderit facilis, dolores perferendis! Quod, vel necessitatibus?</p>
                </div>
                <div className="mb-4">
                    <h4>Penyakit dan Hama Umum</h4>
                    <p className="text-secondary">Berikut penyakit dan hama yang umum menyerang tanaman NAMA TANAMAN</p>

                    <div className="prev-preds container">
                        <div className="row">
                            <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                <a href="" className="normal-link shadow-sm border rounded w-100">
                                    <div className="resp-card-img rounded">
                                        <img src="./assets/example.jpg" className="rounded-top"/>
                                    </div>
                                    <div className="w-100 p-2">
                                        <div>
                                            <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                <a href="" className="normal-link shadow-sm border rounded w-100">
                                    <div className="resp-card-img rounded">
                                        <img src="./assets/example.jpg" className="rounded-top"/>
                                    </div>
                                    <div className="w-100 p-2">
                                        <div>
                                            <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                <a href="" className="normal-link shadow-sm border rounded w-100">
                                    <div className="resp-card-img rounded">
                                        <img src="./assets/example.jpg" className="rounded-top"/>
                                    </div>
                                    <div className="w-100 p-2">
                                        <div>
                                            <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-sm-4 mb-4 d-flex ps-0 pe-3">
                                <a href="" className="normal-link shadow-sm border rounded w-100">
                                    <div className="resp-card-img rounded">
                                        <img src="./assets/example.jpg" className="rounded-top"/>
                                    </div>
                                    <div className="w-100 p-2">
                                        <div>
                                            <p className="mb-0 prev-pred-title">Predicted Kacang Panjang Hama Tulis</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default PlantView;

