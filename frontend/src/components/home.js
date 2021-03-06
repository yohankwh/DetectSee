import React from 'react';
import {Link} from 'react-router-dom';

const Home = props => {
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

            </div>
        </div>
    );
}

export default Home;
