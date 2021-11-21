import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Predictor = props => {
  return (
    <>
        <div className="content-title mb-4">
            <h2 className="text-center">Deteksi Tanaman Baru</h2>
        </div>
        <div className="content-main">
            <div className="pb-4 border-bottom">
                <div className="mb-3 d-flex justify-content-center">
                    <div className="bg-steps steps-col rounded w-75 border">
                        <div className="container d-flex justify-content-center pt-4 pb-2 border-bottom">
                            <small>Gunakan Kamera atau Unggah Foto</small>
                        </div>
                        <div className="py-3">
                            <div className="input-wrapper d-flex justify-content-center">
                                <label className="items-center px-2 py-1 bg-white rounded" style={{cursor: "pointer"}}>
                                    <span className="text-base leading-normal">Ambil Foto</span>
                                    <input type="file" accept="image/*" className="d-none"></input>
                                </label>
                            </div>
                            <div className="image-wrapper p-2 d-flex justify-content-center">
                                <div className="image-holder bg-light m-auto">
                                    {/* <img object-fit="cover" src={imageURL} crossOrigin="anonymous" ref={imageRef}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center py">
                    <button className="btn border rounded primary-green-btn weight-500">Identifikasi</button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="mb-3 py-3 text-center">
                    <h4>Hasil Diagnosis</h4>
                    <div className="rounded">
                        <small>Tanaman Anda mungkin termasuk dari salah satu penyakit di bawah ini.</small>
                    </div>
                </div>
            </div>
            <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
                <div className="pred-card border rounded shadow-sm p-3 pb-2 w-75 m-auto">
                    <div>
                        <div className="pb-2">
                            <div className="d-flex">
                                <div className="col">
                                    <p className="text-end mb-0 font-08em"><i>Confidence: 69%</i></p>
                                    <h5 className="mb-0">Tanaman Hama Tulis</h5>
                                    <p className="text-secondary mb-0">Deezospora Nuterillo</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn collapse-btn" data-toggle="collapse" data-target="#pred-1"
                            aria-expanded="false" aria-controls="pred-1">
                                <p className="mb-0 text-center text-secondary font-08em">klik untuk detail</p>
                            </button>
                        </div>
                    </div>
                    <div className="collapse show" id="pred-1">
                        <div className="pred-card-images container py-2">
                            <div className="row justify-content-center">
                                <div className="col-3 px-0">
                                    <img src="./assets/example.jpg" className="rounded"/>
                                </div>
                                <div className="col-3 px-0 mx-3">
                                    <img src="./assets/example.jpg" className="rounded"/>
                                </div>
                                <div className="col-3 px-0">
                                    <img src="./assets/example.jpg" className="rounded"/>
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5>Gejala</h5>
                            <ul className="ps-3">
                                <li>Deez</li>
                                <li>Nuts</li>
                            </ul>
                        </div>
                        <p className="text-end"><a href="">Lihat Selengkapnya</a></p>
                    </div>
                </div>
            </div>
            <div className="pred-card-wrap w-75 m-auto flex-row mb-4">
                <div className="pred-card border rounded shadow-sm p-3 pb-2 w-75 m-auto">
                    <div>
                        <div className="pb-2">
                            <div className="d-flex">
                                <div className="col">
                                    <p className="text-end mb-0 font-08em"><i>Confidence: 69%</i></p>
                                    <h5 className="mb-0">Tanaman Hama Tulis</h5>
                                    <p className="text-secondary mb-0">Deezospora Nuterillo</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn collapse-btn"
                            data-toggle="collapse" data-target="#pred-2"
                            aria-expanded="false" aria-controls="pred-2">
                                <p className="mb-0 text-center text-secondary font-08em">klik untuk detail</p>
                            </button>
                        </div>
                    </div>
                    <div className="collapse" id="pred-2">
                        <div className="pred-card-images container py-2">
                            <div className="row justify-content-center">
                                <div className="col-3 px-0">
                                    <img src="assets/example.jpg" className="rounded"/>
                                </div>
                                <div className="col-3 px-0 mx-3">
                                    <img src="assets/example.jpg" className="rounded"/>
                                </div>
                                <div className="col-3 px-0">
                                    <img src="assets/example.jpg" className="rounded"/>
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <h5>Gejala</h5>
                            <ul className="ps-3">
                                <li>Deez</li>
                                <li>Nuts</li>
                            </ul>
                        </div>
                        <p className="text-end"><a href="">Lihat Selengkapnya</a></p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Predictor;