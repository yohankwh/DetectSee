import React, {useState, useEffect} from 'react';
import DiseaseDataService from '../services/diseases';
import ImageDataService from '../services/images';
import {Link} from 'react-router-dom';

const DiseaseView = props => {
    const [disease, setDisease] = useState(null);
    const diseaseParam = props.match.params.id;
    const [imgUrls, setImgUrls] = useState([]);

    useEffect(()=>{
        fetchDisease(diseaseParam)
    },[]);

    const fetchDisease = (name) => {
        DiseaseDataService.get(name)
        .then((fetched)=>{
            setDisease(fetched.data);
            fetchDiseaseImages(fetched.data._id);
        }
        ).catch(err=>{
            console.log(err);
        });
    }

    const fetchDiseaseImages = (id) => {
        ImageDataService.getDiseaseImgs(id)
        .then(fetched => {
            let urls = fetched.data;
            urls = urls.map(url => 'http://localhost:5000/uploads/diseases/'+url);
            setImgUrls(urls);
            console.log(fetched.data);
        }).catch(err => {
            console.log(err);
        })
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
                    <h2>{disease.name}</h2>
                    <span className="text-secondary">Tips mengatasi {disease.name} (<i>{disease.sp}</i>)</span>
                </div>
                <div className="content-main">
                    <div>
                        <div className="mb-4">
                            <h4>Contoh Gambar</h4>
                            <div className="disease-example container py-1">
                                <div className="row gap-3">
                                    {imgUrls.length>0 && 
                                        imgUrls.map(img => {
                                            return (<div className="col-3 px-0">
                                                <div className="disease-image rounded">
                                                    <img src={img} className="rounded"/>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p>{disease.desc}</p>
                        </div>
                        <div className="mb-4">
                            <h4>Gejala</h4>
                            <p className="text-secondary">Gejala umum {disease.name} berupa:</p>
                            <ul className="ps-3">
                                {disease.gejala && disease.gejala.length>0 && 
                                    disease.gejala.map((gejala, idx) => {
                                        return (
                                        <li>{gejala}</li>
                                    )})
                                }
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h4>Penanganan</h4>
                            <p className="text-secondary">Penanganan {disease.name} dapat dilakukan dengan:</p>
                            <ul className="ps-3">
                                {disease.penanganan && disease.penanganan.length>0 && 
                                    disease.penanganan.map((penanganan, idx) => {
                                        return (
                                        <li>{penanganan}</li>
                                    )})
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default DiseaseView;

