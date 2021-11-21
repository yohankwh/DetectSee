import React, {useState, useEffect} from 'react';
import DiseaseDataService from '../services/diseases';
import {Link} from 'react-router-dom';

const DiseaseView = props => {
    const [disease, setDisease] = useState(null);
    const diseaseParam = props.match.params.id;

    useEffect(()=>{
        fetchDisease(diseaseParam)
    },[]);

    const fetchDisease = (name) => {
        DiseaseDataService.get(name)
        .then((fetched)=>{
            setDisease(fetched)}
        ).catch(err=>{
            console.log(err);
        });
    }

    if(!disease){
        return (
            <div className="p-1">
                <h2>Info Hama atau Penyakit Tidak Tersedia</h2>
                <p>Coba cek kembali URL yang anda kunjungi.</p>
            </div>
        );
    }else{
        return (
            <>
                <div className="content-title mb-5">
                    <h2>{disease.data.name}</h2>
                    <span className="text-secondary">Tips mengatasi {disease.data.name} (<i>{disease.data.sp}</i>)</span>
                </div>
                <div className="content-main">
                    <div>
                        <div className="mb-4">
                            <h4>Contoh Gambar</h4>
                            <div className="disease-example container">
                                <div className="row">
                                    <div className="col-3 px-0">
                                        <div className="disease-image rounded">
                                            <img src="./assets/example.jpg" className="rounded"/>
                                        </div>
                                    </div>
                                    <div className="col-3 px-0 mx-3">
                                        <div className="disease-image rounded">
                                            <img src="./assets/example.jpg" className="rounded"/>
                                        </div>
                                    </div>
                                    <div className="col-3 px-0">
                                        <div className="disease-image rounded">
                                            <img src="./assets/example.jpg" className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p>PENYAKIT INI DISEBABKAN OLEH JAMUR/BAKTERI/KURANG AER BLA BLA BLA. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, omnis fugit. Consequuntur, vel veritatis iure sequi maiores ea tempora dolorem debitis aspernatur ipsa quas magni repellat maxime odit reprehenderit facilis, dolores perferendis! Quod, vel necessitatibus?</p>
                        </div>
                        <div className="mb-4">
                            <h4>Gejala</h4>
                            <p className="text-secondary">Gejala umum NAMA_TANAMAN berupa:</p>
                            <ul className="ps-3">
                                <li>Aadasd</li>
                                <li>Aadasd</li>
                                <li>Aadasd</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h4>Penanganan</h4>
                            <p className="text-secondary">Penanganan NAMA_TANAMAN dapat dilakukan dengan:</p>
                            <ul className="ps-3">
                                <li>Aadasd</li>
                                <li>Aadasd</li>
                                <li>Aadasd</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default DiseaseView;

